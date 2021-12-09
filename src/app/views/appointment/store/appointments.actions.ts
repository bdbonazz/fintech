import { createAction, props } from '@ngrx/store';
import { DayWithSlot, DayWithSlots, Location, slot } from 'src/app/models/location';


export const loadLocations = createAction('[Appointment] Load Locations');
export const loadLocationsSuccess = createAction(
  '[Appointment] Load Locations Success',
  props<{ locations: Location[] }>()
);
export const loadLocationsFail = createAction(
  '[Appointment] Load Locations Fail',
  props<{ err: any }>()
);

export const setLocationID = createAction(
  '[Appointment] Set Location ID',
  props<{ id: string }>()
);

export const loadSlots = createAction(
  '[Appointment] Load Slots',
  props<{ id: string }>()
);
export const loadSlotsSuccess = createAction(
  '[Appointment] Load Slots Success',
  props<{ daysWithSlots: DayWithSlots[] }>()
);
export const loadSlotsFail = createAction(
  '[Appointment] Load Slots Fail',
  props<{ err: any }>()
);

export const setSelectedDate = createAction(
  '[Appointment] Set Selected Date',
  props<{ date: Date | null }>()
);

export const setClickedSlot = createAction(
  '[Appointment] Set Clicked Slot',
  props<{ slot: slot }>()
);

export const askAppointment = createAction(
  '[Appointment] Ask Appointment',
  props<{ dayWithSlot: DayWithSlot }>()
);

export const addAppointment = createAction(
  '[Appointment] Add Appointment',
  props<{ dayWithSlot: DayWithSlot }>()
);
export const addAppointmentSuccess = createAction('[Appointment] Add Appointment Success');
export const addAppointmentFail = createAction(
  '[Appointment] Add Appointment Fail',
  props<{ err: any }>()
);
