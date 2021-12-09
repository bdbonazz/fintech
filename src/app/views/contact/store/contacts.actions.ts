import { createAction, props } from '@ngrx/store';
import { Contact } from 'src/app/models/contact';
import { StateType } from './contacts.reducer';


export const loadContacts = createAction('[Contacts] Load');
export const loadContactsSuccess = createAction(
  '[Contacts] Load Success',
  props<{ contacts: Contact[] }>()
)
export const loadContactsFail = createAction('[Contacts] Load Fail')

export const deleteContact = createAction(
  '[Contacts] Delete',
  props<{ id: string }>());
export const deleteContactSuccess = createAction(
  '[Contacts] Delete Success',
  props<{ id: string }>()
)
export const deleteContactFail = createAction('[Contacts] Delete Fail')

export const setState = createAction(
  '[Contacts] Set State',
  props<{ value: StateType }>()
)

export const addContact = createAction(
  '[Contacts] Add',
  props<{ contact: Partial<Contact> }>());
export const addContactSuccess = createAction(
  '[Contacts] Add Success',
  props<{ contact: Contact }>()
)
export const addContactFail = createAction('[Contacts] Add Fail')

export const editContact = createAction(
  '[Contacts] Edit',
  props<{ contact: Partial<Contact> }>());
export const editContactSuccess = createAction(
  '[Contacts] Edit Success',
  props<{ contact: Contact }>()
)
export const editContactFail = createAction('[Contacts] Edit Fail')
