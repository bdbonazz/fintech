import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ContactsService } from 'src/app/api/contacts.service';
import { addContact, addContactFail, addContactSuccess, deleteContact, deleteContactFail, deleteContactSuccess, editContact, editContactFail, editContactSuccess, loadContacts, loadContactsFail, loadContactsSuccess } from './contacts.actions';

@Injectable()
export class ContactsEffects {

  constructor(
    private actions: Actions,
    private contactsService: ContactsService,
    private notificationService: NotificationService
  ) {}

  loadContacts$ = createEffect(() => this.actions.pipe(
    ofType(loadContacts),
    switchMap(() => this.contactsService.getContacts().pipe(
      map(contacts => loadContactsSuccess({ contacts })),
      catchError(() => of(loadContactsFail()))
    ))
  ))

  deleteContacts$ = createEffect(() => this.actions.pipe(
    ofType(deleteContact),
    mergeMap(({ id }) => this.contactsService.deleteContact(id).pipe(
      map(() => deleteContactSuccess({ id })),
      catchError(() => of(deleteContactFail))
    ))
  ))

  addContacts$ = createEffect(() => this.actions.pipe(
    ofType(addContact),
    mergeMap(({ contact }) => this.contactsService.addContact(contact).pipe(
      map(res => {
        console.log(res);
        return addContactSuccess({ contact: res });
      }),
      catchError(() => of(addContactFail()))
    ))
  ))

  editContacts$ = createEffect(() => this.actions.pipe(
    ofType(editContact),
    mergeMap(({ contact }) => this.contactsService.patchContact(contact).pipe(
      map(res => editContactSuccess({ contact: res })),
      catchError(() => of(editContactFail))
    ))
  ))

  contactsFail$ = createEffect(() => this.actions.pipe(
    ofType(deleteContactFail, addContactFail, editContactFail),
    tap(_ => this.notificationService.show("C'è stato un errore", 'danger'))
  ), { dispatch: false })
}
