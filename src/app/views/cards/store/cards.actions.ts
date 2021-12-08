import { createAction, props } from '@ngrx/store';
import { Card, CardForm } from 'src/app/models/card';

export const setDrawer = createAction(
  '[Cards] Set Drawer',
  props<{ value: boolean }>()
  );
export const openDrawer = createAction('[Cards] Open Drawer');
export const closeDrawer = createAction('[Cards] Close Drawer');

export const loadCards = createAction('[Cards] Load');
export const loadCardsSuccess = createAction(
  '[Cards] Load Success',
  props<{ cards: Card[] }>()
)
export const loadCardsFail = createAction('[Cards] Load Fail')


export const goToCardDetail = createAction('[Cards] Go To Detail', props<{
  cardId: string
}>());


export const deleteCard = createAction('[Cards] Delete', props<{
  id: string
}>());
export const deleteCardSuccess = createAction('[Cards] Delete Success', props<{
  id: string
}>());
export const deleteCardFail = createAction('[Cards] Delete Fail');


export const addCard = createAction('[Cards] Add', props<{
  card: CardForm
}>());
export const addCardSuccess = createAction('[Cards] Add Success', props<{
  card: Card
}>());
export const addCardFail = createAction('[Cards] Add Fail');
