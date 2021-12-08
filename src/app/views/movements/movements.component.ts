import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { Movement } from 'src/app/models/movement';

@Component({
  selector: 'ft-movements',
  template: `
  <div class="containter m-3">
    <mat-form-field appearance="fill">
      <mat-label>Seleziona una carta</mat-label>
      <mat-select [value]="selectedCardId$ | async" (selectionChange)="changeCard($event.value)">
        <mat-option *ngFor="let card of cards$ | async" [value]="card._id">
          {{card.number}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <br>
    <mat-label *ngIf="selectedCard$ | async as selectedCard" style="font-size: larger; font-weight: bold;">Saldo {{selectedCard.amount | currency}}</mat-label>
    <br>
    <div *ngIf="movements$ | async as movements">
      <mat-accordion *ngIf="movements.length">
        <!--<ft-movement *ngFor="let movement of movements" [movement]="movement"></ft-movement>-->
        <ft-movement *ngFor="let movement of movements"
        [date]="movement.timestamp | date"
        [type]="movement.type"
        [amount]="movement.amount | currency"
        [title]="movement.title"
        [description]="movement.description"
        ></ft-movement>
      </mat-accordion>
      <br>
      <button mat-button *ngIf="shouldLoadMore$ | async" (click)="LoadMoreMovements()">Carica Altro</button>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class MovementsComponent implements OnDestroy {

  sub = new Subscription();

  movementsToShowChunkLenght = 5;

  cards$ = new BehaviorSubject<Card[]>([]);
  selectedCardId$ = new BehaviorSubject<string>('');

  selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, cardID]) => {
      return cards.find(x => x._id === cardID)
    })
  );

  movements$ = new BehaviorSubject<Movement[]>([]);
  total$ = new BehaviorSubject<number>(0);

  shouldLoadMore$ = combineLatest([this.movements$, this.total$]).pipe(
    map(([movements, total]) => {
      return total > movements.length;
    })
  );

  constructor(private cardService: CardsService, private activatedRoute: ActivatedRoute)
  {
    cardService.getCards()
      .subscribe({
        next: res => this.cards$.next(res),
        error: err => console.error(err)
      });

      this.sub.add(
        this.selectedCard$.pipe(
          filter(res => !!res),
          switchMap(res => cardService.getMovements(res._id, this.movementsToShowChunkLenght, 0))
        )
        .subscribe({
          next: res => {
            this.movements$.next(res.data);
            this.total$.next(res.total);
          }
        })
      )

      this.sub.add(activatedRoute.params.subscribe({
        next: res => this.selectedCardId$.next(res.cardId),
        error: err => console.error(err)
      }));
  }

  changeCard(cardID: string){
    this.selectedCardId$.next(cardID);
  }

  LoadMoreMovements(){
    const actualMovements = this.movements$.getValue();
    this.cardService.getMovements(this.selectedCardId$.getValue(), this.movementsToShowChunkLenght, actualMovements.length)
      .subscribe({
        next: res => {
          this.movements$.next([...actualMovements, ...res.data]);
          this.total$.next(res.total);
        },
        error: err => console.error(err)
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
