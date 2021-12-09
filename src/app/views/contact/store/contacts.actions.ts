import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/models/contact';
import { StateType } from './contacts.reducer';


export const loadContacts = createAction('[Contacts] Load Contacts');
export const loadContactsSuccess = createAction(
  '[Contacts] Load Contacts Success',
  props<{ contacts: Contact[] }>()
)
export const loadContactsFail = createAction(
  '[Contacts] Load Contacts Fail',
  props<{ err: any }>()
);

export const deleteContact = createAction(
  '[Contacts] Delete Contact',
  props<{ id: string }>());
export const deleteContactSuccess = createAction(
  '[Contacts] Delete Contact Success',
  props<{ id: string }>()
)
export const deleteContactFail = createAction(
  '[Contacts] Delete Contact Fail',
  props<{ err: any }>()
);

export const setState = createAction(
  '[Contacts] Set State',
  props<{ value: StateType }>()
)

export const addContact = createAction(
  '[Contacts] Add Contact',
  props<{ contact: Partial<Contact> }>());
export const addContactSuccess = createAction(
  '[Contacts] Add Contact Success',
  props<{ contact: Contact }>()
)
export const addContactFail = createAction(
  '[Contacts] Add Contact Fail',
  props<{ err: any }>()
);

export const editContact = createAction(
  '[Contacts] Edit Contact',
  props<{ contact: Partial<Contact> }>());
export const editContactSuccess = createAction(
  '[Contacts] Edit Contact Success',
  props<{ contact: Contact }>()
)
export const editContactFail = createAction(
  '[Contacts] Edit Contact Fail',
  props<{ err: any }>()
);
