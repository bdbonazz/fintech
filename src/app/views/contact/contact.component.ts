import { Component, OnDestroy, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectContactChoosenContactState, selectContactContactsState, selectFeatureContact, selectContactLoadingState, selectContactSelectedContactState, selectContactStateState } from './store/contacts.selectors';
import { addContact, deleteContact, editContact, loadContacts, setState } from './store/contacts.actions';
import { StateType } from './store/contacts.reducer';


@Component({
  selector: 'ft-contact',
  template: `
  <div *ngIf="stateType$ | async as stateType">
    <ng-container *ngIf="stateType.type === 'list'">
      <ft-contact-list
        [loading]="loading$ | async"
        [contacts]="contacts$ | async"
        (delete)="removeContactHanlder($event)"
        (edit)="editContactHanlder($event)"
        (select)="selectContactHanlder($event)"
      ></ft-contact-list>
      <button
      mat-raised-button
      color="primary"
      type="button"
      class="btn btn-primary fullWidth"
      (click)="newContactHanlder()">
        Nuovo contatto
      </button>
    </ng-container>
    <ng-container *ngIf="stateType.type === 'new' || stateType.type === 'edit'">
      <ft-contact-form
        [loading]="loading$ | async"
        [contact]="selectedContact$ | async"
        (saveContact)="saveContactHanlder($event)"
        (close)="backToList()"
      ></ft-contact-form>
    </ng-container>
  </div>
  `,
  styles: [
  ]
})
export class ContactComponent implements OnInit, OnDestroy {
  sub = new Subscription();

  tempo$ = this.store.select(selectFeatureContact);
  contacts$ = this.store.select(selectContactContactsState);
  stateType$ = this.store.select(selectContactStateState);
  loading$ = this.store.select(selectContactLoadingState);

  selectedContact$ = this.store.select(selectContactSelectedContactState);

  constructor(
    private dialogRef: MatDialogRef<ContactComponent>,
    private store: Store
    ) { }

  ngOnInit()
  {
    this.sub.add(this.store.select(selectContactChoosenContactState).pipe(
      filter(x => !!x)
    ).subscribe({
      next: res => {
        this.dialogRef.close(res);
      },
      error: err => console.error(err)
    }));

    this.store.dispatch(loadContacts());
  }

  ngOnDestroy(): void { this.sub.unsubscribe(); }

  removeContactHanlder(_id: string) { this.store.dispatch(deleteContact({ id : _id })) }

  saveContactHanlder(contact: Partial<Contact>) {
    this.stateType$.pipe(
      take(1)
    ).subscribe((res: StateType) => {
      switch(res.type)
        {
          case 'edit': this.store.dispatch(editContact({ contact }));
          case 'new': this.store.dispatch(addContact({ contact }));
        }
    })
  }

  selectContactHanlder(_id: string) { this.store.dispatch(setState({ value : { type: 'list', id: _id } })) }

  editContactHanlder(_id: string) { this.store.dispatch(setState({ value : { type: 'edit', id: _id } })) }

  newContactHanlder() { this.store.dispatch(setState({ value : { type: 'new' } })) }

  backToList() { this.store.dispatch(setState({ value : { type: 'list', id: ''} })) }
}
