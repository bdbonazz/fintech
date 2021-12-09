import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DayWithSlot } from 'src/app/models/location';
import { sameDateFromDate } from 'src/app/shared/utils/utils';
import { AppointmentState } from './appointments.reducer';



export const selectFeatureAppointment = createFeatureSelector<{appointments: AppointmentState}>('appointments');

export const selectAppointmentLocationsState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.locations
);

export const selectAppointmentLoadingState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.loading
)

export const selectAppointmentOpenedDrawerState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.openedDrawer
)

export const selectAppointmentSelectedLocationIdState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.selectedLocationId
)

export const selectAppointmentSelectedLocationState = createSelector(
  selectAppointmentLocationsState,
  selectAppointmentSelectedLocationIdState,
  (locations, selectedLocationId) => {
    const index = locations.findIndex(x => x._id === selectedLocationId);
    return index >= 0 ? locations[index] : null;
  }
)

export const selectAppointmentDaysWithSlotsState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.daysWithSlots
)

export const selectAppointmentSelectedDateState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.selectedDate
)

export const selectAppointmentSelectedSlotState = createSelector(
  selectAppointmentDaysWithSlotsState,
  selectAppointmentSelectedDateState,
  (daysWithSlots, selectedDate) => {
    return daysWithSlots && selectedDate ? daysWithSlots.find(x => sameDateFromDate(x.day, selectedDate)) : null;
  }
)

export const selectAppointmentClickedSlotState = createSelector(
  selectFeatureAppointment,
  state => state.appointments.clickedSlot
)

export const selectAppointmentNewAppointmentState = createSelector(
  selectAppointmentSelectedSlotState,
  selectAppointmentClickedSlotState,
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



