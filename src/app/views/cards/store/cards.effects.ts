import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { addCard, addCardFail, addCardSuccess, closeDrawer, deleteCard, deleteCardFail, deleteCardSuccess, goToCardDetail, loadCards, loadCardsFail, loadCardsSuccess, openDrawer, setDrawer } from './cards.actions';
import { NotificationService } from 'src/app/core/services/notification.service';
import { go } from 'src/app/store/router.actions';

@Injectable()
export class CardsEffects {

  constructor(
    private actions: Actions,
    private cardsService: CardsService,
    private notificationService: NotificationService
  ) {}

  setDrawer$ = createEffect(() => this.actions.pipe(
    ofType(setDrawer),
    map(({ value }) =>  value ? openDrawer() : closeDrawer()
  )));

  loadCards$ = createEffect(() => this.actions.pipe(
    ofType(loadCards),
    switchMap(() => this.cardsService.getCards().pipe(
      map(cards => loadCardsSuccess({ cards })),
      catchError(() => of(loadCardsFail()))
    ))
  ))

  goToCardDetail$ = createEffect(() => this.actions.pipe(
    ofType(goToCardDetail),
    map(({ cardId }) => go({ path: ['dashboard', 'movements', cardId] })),
  ))

  deleteCard$ = createEffect(() => this.actions.pipe(
    ofType(deleteCard),
    mergeMap(({ id }) => this.cardsService.deleteCard(id).pipe(
      map(() => deleteCardSuccess({ id })),
      catchError(() => of(deleteCardFail))
    ))
  ))
  deleteCardSuccess$ = createEffect(() => this.actions.pipe(
    ofType(deleteCardSuccess),
    tap(_ => this.notificationService.show('Carta Rimossa con Successo'))
  ), { dispatch: false })
  deleteCardFail$ = createEffect(() => this.actions.pipe(
    ofType(deleteCardFail),
    tap(_ => this.notificationService.show("C'è stato un problema nella rimozione della carta'", 'danger'))
  ), { dispatch: false })


  addCard$ = createEffect(() => this.actions.pipe(
    ofType(addCard),
    mergeMap(({ card }) => this.cardsService.addCard(card).pipe(
      map(addedCard => addCardSuccess({ card: addedCard })),
      catchError(() => of(addCardFail))
    ))
  ))
  addCardSuccess$ = createEffect(() => this.actions.pipe(
    ofType(addCardSuccess),
    tap(_ => this.notificationService.show('Carta Aggiunta con Successo'))
  ), { dispatch: false })
  addCardFail$ = createEffect(() => this.actions.pipe(
    ofType(addCardFail),
    tap(_ => this.notificationService.show("C'è stato un problema nel salvataggio della carta", 'danger'))
  ), { dispatch: false })

}
