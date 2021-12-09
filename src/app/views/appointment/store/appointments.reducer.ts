import { createReducer, on } from '@ngrx/store';
import { DayWithSlots, Location, slot } from 'src/app/models/location';
import { addAppointmentSuccess, loadLocations, loadLocationsFail, loadLocationsSuccess, loadSlots, loadSlotsFail, loadSlotsSuccess, setClickedSlot, setLocationID, setSelectedDate } from './appointments.actions';

export type AppointmentState = {
  locations: Location[];
  loading: boolean;
  openedDrawer: boolean;
  selectedLocationId: string;
  daysWithSlots: DayWithSlots[];
  selectedDate: Date | null,
  clickedSlot: slot | null
};
export const initialState: AppointmentState = {
  locations: [],
  loading: false,
  openedDrawer: false,
  selectedLocationId: '',
  daysWithSlots: [],
  selectedDate: null,
  clickedSlot: null
};

export const AppointmentReducer = createReducer(
  initialState,
  on(loadLocations, (state) => ({ ...state, loading: true })),
  on(loadLocationsSuccess, (state, action) => ({
    ...state,
    loading: false,
    locations: action.locations
  })),
  on(loadLocationsFail, (state) => ({ ...state, loading: false })),

  on(setLocationID, (state, action) => ({
    ...state,
    openedDrawer: true,
    selectedLocationId: action.id
  })),

  on(loadSlots, (state) => ({ ...state, loading: true })),
  on(loadSlotsSuccess, (state, action) => ({
    ...state,
    loading: false,
    daysWithSlots: action.daysWithSlots
  })),
  on(loadSlotsFail, (state) => ({ ...state, loading: false })),

  on(setSelectedDate, (state, action) => ({
    ...state,
    selectedDate: action.date
  })),
  on(setClickedSlot, (state, action) => ({
    ...state,
    clickedSlot: action.slot
  })),
  on(addAppointmentSuccess, (state) => ({
    ...state,
    openedDrawer: false,
    selectedDate: null,
    clickedSlot: null
  })),
);
