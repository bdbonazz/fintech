import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovementsSelectorUtility } from 'src/app/models/movement';
import { selectCardsState } from '../../cards/store/cards.selectors';
import { MovementState } from './movements.reducer';

export const selectFeatureMovement = createFeatureSelector<{movements: MovementState}>('movements');

export const selectLoadingState = createSelector(
  selectFeatureMovement,
  state => state.movements.loading
)

export const selectLoadingMovementsState = createSelector(
  selectFeatureMovement,
  state => state.movements.loadingMovements
)

export const selectShowChunkLenghtState = createSelector(
  selectFeatureMovement,
  state => state.movements.showChunkLenght
)

export const selectSelectedCardIdState = createSelector(
  selectFeatureMovement,
  state => state.movements.selectedCardId
)

export const selectSelectedCardState = createSelector(
  selectCardsState,
  selectSelectedCardIdState,
  (cards, selectedCardId) => cards && selectedCardId ? cards.find(x => x._id === selectedCardId) : null
)

export const selectMovementsState = createSelector(
  selectFeatureMovement,
  state => state.movements.movements
)

export const selectTotalState = createSelector(
  selectFeatureMovement,
  state => state.movements.total
)

export const selectShouldLoadMoreState = createSelector(
  selectMovementsState,
  selectTotalState,
  (movements, total) => total > movements.length
)

export const selectGetMovementsState = createSelector(
  selectSelectedCardIdState,
  selectMovementsState,
  selectShowChunkLenghtState,
  selectLoadingMovementsState,
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
