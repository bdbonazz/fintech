import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { go } from 'src/app/store/router.actions';
import { loadCards } from '../cards/store/cards.actions';
import { selectCardCardsState } from '../cards/store/cards.selectors';
import { getMovements, loadMoreMovements } from './store/movements.actions';
import { selectMovementGetMovementsState, selectMovementsState, selectMovementSelectedCardIdState, selectMovementSelectedCardState, selectMovementShouldLoadMoreState, selectMovementTotalState, selectMovementLoadingState } from './store/movements.selectors';

@Component({
  selector: 'ft-movements',
  template: `
  <div style="height: 100%; width: 100%; background-color:white">
    <div class="containter m-3" >
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
  </div>
  `,
  styles: [
  ]
})
export class MovementsComponent implements OnInit, OnDestroy {

  sub = new Subscription();

  movementsToShowChunkLenght = 5;

  loading$ = this.store.select(selectMovementLoadingState);

  cards$ = this.store.select(selectCardCardsState);
  selectedCardId$ = this.store.select(selectMovementSelectedCardIdState);
  selectedCard$ = this.store.select(selectMovementSelectedCardState);

  movements$ = this.store.select(selectMovementsState);
  total$ = this.store.select(selectMovementTotalState);
  shouldLoadMore$ = this.store.select(selectMovementShouldLoadMoreState);

  constructor(
    private store: Store
    ) { }

  ngOnInit(): void {
    this.sub.add(
      this.store.select(selectMovementGetMovementsState).subscribe(
        res => this.store.dispatch(getMovements(res)
        ))
    );
    this.store.dispatch(loadCards())
  }

  changeCard(cardId: string) { this.store.dispatch(go({ path: ['dashboard', 'movements', cardId] })); }

  LoadMoreMovements() { this.store.dispatch(loadMoreMovements()); }

  ngOnDestroy(): void { this.sub.unsubscribe(); }
}
