import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardForm } from 'src/app/models/card';
import { addCard, deleteCard, goToCardDetail, loadCards, setDrawer } from './store/cards.actions';
import { selectCardCardsState, selectCardClearCountState, selectCardLoadingState, selectCardOpenedDrawerState } from './store/cards.selectors';

@Component({
  selector: 'ft-cards',
  template: `
  <mat-drawer-container style="height: 100%; padding: 20px">
    <mat-spinner *ngIf="loading$ | async; else elseBlock"></mat-spinner>
    <ng-template #elseBlock>
      <ft-card-list
      [cards]="cards$ | async"
      (NewCard)="insertNewCard()"
      (Delete)="deleteCard($event)"
      (Details)="cardDetail($event)"
      ></ft-card-list>
    </ng-template>
    <mat-drawer #drawer mode="side" position="end" style="padding: 20px; height:100%" [opened]="openedDrawer$ | async">
      <ft-card-form
      [clearCount]="clearCount$ | async"
      [loading]="loading$ | async"
      (savedCard)="saveCard($event)"
      (close)="closeCardForm()"
      ></ft-card-form>
    </mat-drawer>
  </mat-drawer-container>

  `,
  styles: [`
  `]
})
export class CardsComponent implements OnInit {

  clearCount$ = this.store.select(selectCardClearCountState);
  openedDrawer$ = this.store.select(selectCardOpenedDrawerState);
  loading$ = this.store.select(selectCardLoadingState);
  cards$ = this.store.select(selectCardCardsState);

  constructor(
    private store: Store
    ) { }

  ngOnInit(): void { this.store.dispatch(loadCards()) }

  insertNewCard() { this.store.dispatch(setDrawer({ value: true }))}

  deleteCard(cardId: string) { this.store.dispatch(deleteCard({ id: cardId})); }

  cardDetail(cardId: string) { this.store.dispatch(goToCardDetail({ cardId: cardId})); }

  saveCard(newCard: CardForm) { this.store.dispatch(addCard({ card: newCard})); }

  closeCardForm() { this.store.dispatch(setDrawer({ value: false }))}
}
