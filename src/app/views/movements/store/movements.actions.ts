import { createAction, props } from '@ngrx/store';
import { CardMovements, MovementsSelectorUtility } from 'src/app/models/movement';

export const selectCardId = createAction('[Movements] Select Card ID', props<{
  id: string
}>());

//se concatLatestFrom fosse stata disponibile, non avrei dovuto passare alcun argomento
export const getMovements = createAction('[Movements] Get Movements'
, props<MovementsSelectorUtility>()
);
export const getMovementsSuccess = createAction('[Movements] Get  MovementsSuccess', props<{
  value: CardMovements
}>());
export const getMovementsFail = createAction(
  '[Movements] Get Movements Fail',
  props<{ err: any }>()
);

export const loadMoreMovements = createAction('[Movements] Load More Movements');
