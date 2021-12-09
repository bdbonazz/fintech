import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovementsSelectorUtility } from 'src/app/models/movement';
import { selectCardCardsState } from '../../cards/store/cards.selectors';
import { MovementState } from './movements.reducer';

export const selectFeatureMovement = createFeatureSelector<{movements: MovementState}>('movements');

export const selectMovementLoadingState = createSelector(
  selectFeatureMovement,
  state => state.movements.loading
)

export const selectMovementLoadingMovementsState = createSelector(
  selectFeatureMovement,
  state => state.movements.loadingMovements
)

export const selectMovementShowChunkLenghtState = createSelector(
  selectFeatureMovement,
  state => state.movements.showChunkLenght
)

export const selectMovementSelectedCardIdState = createSelector(
  selectFeatureMovement,
  state => state.movements.selectedCardId
)

export const selectMovementSelectedCardState = createSelector(
  selectCardCardsState,
  selectMovementSelectedCardIdState,
  (cards, selectedCardId) => cards && selectedCardId ? cards.find(x => x._id === selectedCardId) : null
)

export const selectMovementsState = createSelector(
  selectFeatureMovement,
  state => state.movements.movements
)

export const selectMovementTotalState = createSelector(
  selectFeatureMovement,
  state => state.movements.total
)

export const selectMovementShouldLoadMoreState = createSelector(
  selectMovementsState,
  selectMovementTotalState,
  (movements, total) => total > movements.length
)

export const selectMovementGetMovementsState = createSelector(
  selectMovementSelectedCardIdState,
  selectMovementsState,
  selectMovementShowChunkLenghtState,
  selectMovementLoadingMovementsState,
  (cardId, movements, showChunkLenght, loadingMovements) => {
    const ret : MovementsSelectorUtility =
    {
      cardId: cardId,
      movements: movements,
      showChunkLenght: showChunkLenght,
      loadingMovements: loadingMovements
    }
    return ret;
  })
