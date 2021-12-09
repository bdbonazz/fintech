import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from './contacts.reducer';



export const selectFeatureContact = createFeatureSelector<{contacts: ContactState}>('contacts');

export const selectContactContactsState = createSelector(
  selectFeatureContact,
  state => state.contacts.contacts
);

export const selectContactLoadingState = createSelector(
  selectFeatureContact,
  state => state.contacts.loading
)

export const selectContactStateState = createSelector(
  selectFeatureContact,
  state => state.contacts.stateType
)

export const selectContactSelectedContactState = createSelector(
  selectContactContactsState,
  selectContactStateState,
  (contacts, state) => {
    if(state.type === 'new' || !contacts || !contacts.length) {
      return null;
    }

    const index = contacts.findIndex(x => x._id === state.id);
    return index >= 0 ? contacts[index] : null;
  }
)

export const selectContactChoosenContactState = createSelector(
  selectContactSelectedContactState,
  selectContactStateState,
  (selectedContact, state) => selectedContact && state.type === 'list' ? selectedContact : null
)

