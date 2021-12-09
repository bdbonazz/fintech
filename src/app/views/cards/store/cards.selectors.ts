import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CardState } from './cards.reducer';

export const selectFeatureCard = createFeatureSelector<{cards: CardState}>('cards');

export const selectCardCardsState = createSelector(
  selectFeatureCard,
  state => state.cards.cards
);

export const selectCardLoadingState = createSelector(
  selectFeatureCard,
  state => state.cards.loading
)

export const selectCardOpenedDrawerState = createSelector(
  selectFeatureCard,
  state => state.cards.openedDrawer
)

export const selectCardClearCountState = createSelector(
  selectFeatureCard,
  state => state.cards.clearCount
)
