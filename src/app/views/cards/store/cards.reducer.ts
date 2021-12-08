import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/models/card';
import { addCard, addCardFail, addCardSuccess, closeDrawer, deleteCard, deleteCardFail, deleteCardSuccess, loadCards, loadCardsFail, loadCardsSuccess, openDrawer } from './cards.actions';

export type CardState = {
  cards: Card[];
  clearCount: number;
  loading: boolean;
  openedDrawer: boolean;
};
export const initialState: CardState = {
  cards: [],
  clearCount: 0,
  loading: false,
  openedDrawer: false
};

export const CardReducer = createReducer(
  initialState,
  on(openDrawer, (state) => ({ ...state, openedDrawer: true })),
  on(closeDrawer, (state) => ({
    ...state,
    clearCount: state.clearCount + 1,
    openedDrawer: false
   })),

  on(loadCards, (state) => ({ ...state, loading: true })),
  on(loadCardsSuccess, (state, action) => ({
    ...state,
    loading: false,
    cards: action.cards
  })),
  on(loadCardsFail, (state) => ({ ...state, loading: false })),

  on(deleteCard, (state) => ({ ...state, loading: true })),
  on(deleteCardSuccess, (state, action) => ({
    ...state,
    loading: false,
    cards: state.cards.filter(card => card._id !== action.id)
  })),
  on(deleteCardFail, (state) => ({ ...state, loading: false })),

  on(addCard, (state) => ({ ...state, loading: true })),
  on(addCardSuccess, (state, action) => ({
    ...state,
    loading: false,
    openedDrawer: false,
    cards: [...state.cards, action.card]
  })),
  on(addCardFail, (state) => ({ ...state, loading: false })),

);
