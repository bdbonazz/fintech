import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { loadCards } from '../cards/store/cards.actions';
import { getMovements, loadMoreMovements, selectCardId } from './store/movements.actions';
import { selectCardsState, selectGetMovementsState, selectMovementsState, selectSelectedCardIdState, selectSelectedCardState, selectShouldLoadMoreState, selectTotalState } from './store/movements.selectors';

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
export class MovementsComponent implements OnInit, OnDestroy {

  sub = new Subscription();

  movementsToShowChunkLenght = 5;

  cards$ = this.store.select(selectCardsState);
  selectedCardId$ = this.store.select(selectSelectedCardIdState);
  selectedCard$ = this.store.select(selectSelectedCardState);

  movements$ = this.store.select(selectMovementsState);
  total$ = this.store.select(selectTotalState);
  shouldLoadMore$ = this.store.select(selectShouldLoadMoreState);

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
    ) { }

  ngOnInit(): void {
    this.sub.add(
      this.activatedRoute.params.subscribe({
        next: res => this.store.dispatch(selectCardId({id: res.cardId})),
        error: err => console.error(err)
      })
    );
    this.sub.add(
      this.store.select(selectGetMovementsState).subscribe(
        res => this.store.dispatch(getMovements(res)
        ))
    );
    this.store.dispatch(loadCards())
  }

  changeCard(cardId: string) { this.store.dispatch(selectCardId({id: cardId})); }

  LoadMoreMovements() { this.store.dispatch(loadMoreMovements()); }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
