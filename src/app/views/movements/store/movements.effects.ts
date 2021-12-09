import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { getMovements, getMovementsFail, getMovementsSuccess } from './movements.actions';


@Injectable()
export class MovementsEffects {
  constructor(
    private actions: Actions,
    private cardService: CardsService
  ) {}

/*
  selectCardId$ = createEffect(() => this.actions.pipe(
    ofType(selectCardId),
    mapTo(getMovements())
  ))

concatLatestFrom è disponibile da rxjs 12 in poi,
ma quella libreria richiede angular 12, aggiornare questo progetto ad angular 12 o 13 dà problemi che non ho tempo di risolvere
  getMovements$ = createEffect(() => this.actions.pipe(
    ofType(getMovements),
    concatLatestFrom(() => this.store.select(selectGetMovementsState)),
    switchMap(selectGetMovement => {
      return this.cardService.getMovements(
        selectGetMovement.cardId,
        selectGetMovement.showChunkLenght,
        selectGetMovement.movementsLenght
         ).pipe(
          map(res => getMovementsSuccess({ value: res})),
          catchError(() => of(getMovementsFail()))
        )
    })
  ))
  */

  getMovements$ = createEffect(() => this.actions.pipe(
    ofType(getMovements),
    filter(x => x.cardId && x.loadingMovements && x.showChunkLenght > 0),
    switchMap(selectGetMovement => {
      return this.cardService.getMovements(
        selectGetMovement.cardId,
        selectGetMovement.showChunkLenght,
        selectGetMovement.movements.length
         ).pipe(
          map(res => getMovementsSuccess({ value: res})),
          catchError(() => of(getMovementsFail()))
        )
    })
  ))


}
