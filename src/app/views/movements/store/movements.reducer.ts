import { createReducer, on } from '@ngrx/store';
import { Card } from 'src/app/models/card';
import { Movement } from 'src/app/models/movement';
import { loadCards, loadCardsFail, loadCardsSuccess } from '../../cards/store/cards.actions';
import { getMovements, getMovementsFail, getMovementsSuccess, loadMoreMovements, selectCardId } from './movements.actions';

export type MovementState = {
  cards: Card[];
  loading: boolean;
  loadingMovements: boolean;
  showChunkLenght: number;
  selectedCardId: string;
  movements: Movement[];
  total: number;
};
export const initialState: MovementState = {
  cards: [],
  loading: false,
  loadingMovements: true,
  showChunkLenght: 5,
  selectedCardId: '',
  movements: [],
  total: 0
};

export const MovementReducer = createReducer(
  initialState,
  on(selectCardId, (state, action) => ({
    ...state,
    selectedCardId: action.id,
    loadingMovements: true
  })),

  on(loadCards, (state) => ({ ...state, loading: true })),
  on(loadCardsSuccess, (state, action) => ({
    ...state,
    loading: false,
    cards: action.cards
  })),
  on(loadCardsFail, (state) => ({ ...state, loading: false })),

  on(getMovements, (state) => ({
    ...state,
    loading: true
  })),
  on(getMovementsSuccess, (state, action) => ({
    ...state,
    loading: false,
    loadingMovements: false,
    movements: action.value.data ? [...state.movements, ...action.value.data] : [],
    total: action.value.total
  })),
  on(getMovementsFail, (state) => ({
    ...state,
    loading: false,
    loadingMovements: false
  })),
  on(loadMoreMovements, (state) => ({
    ...state,
    loadingMovements: true
  })),

);
