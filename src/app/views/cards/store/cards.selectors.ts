import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState } from './cards.reducer';

export const selectFeatureCard = createFeatureSelector<{cards: CardState}>('cards');

export const selectCardsState = createSelector(
  selectFeatureCard,
  state => state.cards.cards
);

export const selectLoadingState = createSelector(
  selectFeatureCard,
  state => state.cards.loading
)

export const selectOpenedDrawerState = createSelector(
  selectFeatureCard,
  state => state.cards.openedDrawer
)

export const selectClearCountState = createSelector(
  selectFeatureCard,
  state => state.cards.clearCount
)
