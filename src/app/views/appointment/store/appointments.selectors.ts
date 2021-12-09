import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DayWithSlot } from 'src/app/models/location';
import { sameDateFromDate } from 'src/app/shared/utils/utils';
import { AppointmentState } from './appointments.reducer';



export const selectFeatureAppointment = createFeatureSelector<{appointments: AppointmentState}>('appointments');

export const selectLocationsState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.locations
);

export const selectLoadingState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.loading
)

export const selectOpenedDrawerState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.openedDrawer
)

export const selectSelectedLocationIdState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.selectedLocationId
)

export const selectSelectedLocationState = createSelector(
  selectLocationsState,
  selectSelectedLocationIdState,
  (locations, selectedLocationId) => {
    const index = locations.findIndex(x => x._id === selectedLocationId);
    return index >= 0 ? locations[index] : null;
  }
)

export const selectDaysWithSlotsState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.daysWithSlots
)

export const selectSelectedDateState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.selectedDate
)

export const selectSelectedSlotState = createSelector(
  selectDaysWithSlotsState,
  selectSelectedDateState,
  (daysWithSlots, selectedDate) => {
    return daysWithSlots && selectedDate ? daysWithSlots.find(x => sameDateFromDate(x.day, selectedDate)) : null;
  }
)

export const selectClickedSlotState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.clickedSlot
)

export const selectAppointmentState = createSelector(
  selectSelectedSlotState,
  selectClickedSlotState,
  (selectedSlot, slot) => {
    if(!selectedSlot) {
      return null;
    }
    const newAppointment: DayWithSlot = {
      day: selectedSlot.day,
      slot: slot
    }
    return newAppointment;
  }
)



