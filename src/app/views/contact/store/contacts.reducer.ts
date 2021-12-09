import { createReducer, on } from '@ngrx/store';
import { Contact } from 'src/app/models/Contact';
import { addContact, addContactFail, addContactSuccess, deleteContact, deleteContactFail, deleteContactSuccess, editContact, editContactFail, editContactSuccess, loadContacts, loadContactsFail, loadContactsSuccess, setState } from './contacts.actions';

export type StateType = { type: 'list', id: string } | { type: 'new' } | { type: 'edit', id: string }

export type ContactState = {
  contacts: Contact[];
  loading: boolean;
  stateType: StateType;
};
export const initialState: ContactState = {
  contacts: [],
  loading: false,
  stateType: { type: 'list', id: '' }
};

export const ContactReducer = createReducer(
  initialState,
  on(loadContacts, (state) => ({ ...state, loading: true })),
  on(loadContactsSuccess, (state, action) => ({
    ...state,
    loading: false,
    contacts: action.contacts
  })),
  on(loadContactsFail, (state) => ({ ...state, loading: false })),

  on(deleteContact, (state) => ({ ...state, loading: true })),
  on(deleteContactSuccess, (state, action) => ({
    ...state,
    loading: false,
    contacts: state.contacts.filter(contact => contact._id !== action.id)
  })),
  on(deleteContactFail, (state) => ({ ...state, loading: false })),

  on(addContact, (state) => ({ ...state, loading: true })),
  on(addContactSuccess, (state, action) => ({
    ...state,
    loading: false,
    stateType: initialState.stateType,
    contacts: [...state.contacts, action.contact]
  })),
  on(addContactFail, (state) => ({ ...state, loading: false })),

  on(editContact, (state) => ({ ...state, loading: true })),
  on(editContactSuccess, (state, action) => ({
    ...state,
    loading: false,
    stateType: initialState.stateType,
    contacts: state.contacts.map(x => x._id === action.contact._id ? action.contact : x)
  })),
  on(editContactFail, (state) => ({ ...state, loading: false })),

  on(setState, (state, action) => ({ ...state, stateType: action.value }))
);
