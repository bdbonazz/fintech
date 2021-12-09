import { createAction, props } from '@ngrx/store';
import { DayWithSlot, DayWithSlots, Location, slot } from 'src/app/models/location';


export const loadLocations = createAction('[Locations] Load');
export const loadLocationsSuccess = createAction(
  '[Locations] Load Success',
  props<{ locations: Location[] }>()
);
export const loadLocationsFail = createAction('[Locations] Load Fail');

export const setLocationID = createAction(
  '[Locations] Set Location ID',
  props<{ id: string }>()
);

export const loadSlots = createAction(
  '[Slots] Load',
  props<{ id: string }>()
);
export const loadSlotsSuccess = createAction(
  '[Slots] Load Success',
  props<{ daysWithSlots: DayWithSlots[] }>()
);
export const loadSlotsFail = createAction('[Slots] Load Fail');

export const setSelectedDate = createAction(
  '[Locations] Set Selected Date',
  props<{ date: Date | null }>()
);

export const setClickedSlot = createAction(
  '[Locations] Set Clicked Slot',
  props<{ slot: slot }>()
);

export const askAppointment = createAction(
  '[Locations] Ask Appointment',
  props<{ dayWithSlot: DayWithSlot }>()
);

export const addAppointment = createAction(
  '[Slots] Add Appointment',
  props<{ dayWithSlot: DayWithSlot }>()
);
export const addAppointmentSuccess = createAction('[Slots] Add Appointment Success');
export const addAppointmentFail = createAction('[Slots] Add Appointment Fail');
