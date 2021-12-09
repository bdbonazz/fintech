import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from './contacts.reducer';



export const selectFeatureContact = createFeatureSelector<{contacts: ContactState}>('contacts');

export const selectContactsState = createSelector(
  selectFeatureContact,
  state => state.contacts.contacts
);

export const selectLoadingState = createSelector(
  selectFeatureContact,
  state => state.contacts.loading
)

export const selectStateState = createSelector(
  selectFeatureContact,
  state => state.contacts.stateType
)

export const selectSelectedContactState = createSelector(
  selectContactsState,
  selectStateState,
  (contacts, state) => {
    if(state.type === 'new' || !contacts || !contacts.length) {
      return null;
    }

    const index = contacts.findIndex(x => x._id === state.id);
    return index >= 0 ? contacts[index] : null;
  }
)

export const selectChoosenContactState = createSelector(
  selectSelectedContactState,
  selectStateState,
  (selectedContact, state) => selectedContact && state.type === 'list' ? selectedContact : null
)

