import { Component, OnDestroy } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from 'src/app/api/contacts.service';
import { avaibleStyle, NotificationService } from 'src/app/core/services/notification.service';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map, switchMap, take, withLatestFrom } from 'rxjs/operators';

export type State = { type: 'list', id: string } | { type: 'new' } | { type: 'edit', id: string }

@Component({
  selector: 'ft-contact',
  template: `
  <div *ngIf="state$ | async as state">
    <ng-container *ngIf="state.type === 'list'">
      <ft-contact-list
        [contacts]="contacts$ | async"
        (delete)="removeContactHanlder($event)"
        (edit)="editContactHanlder($event)"
        (select)="selectContactHanlder($event)"
      ></ft-contact-list>
      <button
      mat-raised-button
      color="primary"
      type="button"
      class="btn btn-primary"
      style="width:100%"
      (click)="state$.next({ type: 'new'})">
        Nuovo contatto
      </button>
    </ng-container>
    <ng-container *ngIf="state.type === 'new' || state.type === 'edit'">
      <ft-contact-form
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
export class ContactComponent implements OnDestroy {
  sub = new Subscription();

  contacts$ = new BehaviorSubject<Contact[]>([]);
  state$ = new BehaviorSubject<State>({ type: 'list', id: '' })

  selectedContact$ = combineLatest([this.contacts$, this.state$]).pipe(
    map(([contacts, state]) => {
      if(state.type === 'new') {
        return null;
      }

      const index = contacts.findIndex(x => x._id === state.id);
      return index >= 0 ? contacts[index] : null;
    })
  );

  constructor(public notificationService: NotificationService, public dialogRef: MatDialogRef<ContactComponent>, private contactService : ContactsService) {
    contactService.getContacts().subscribe({
      next: res => this.contacts$.next(res),
      error: err => console.error(err)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  selectContactHanlder(_id: string) {
    this.state$.next({ type: 'list', id: _id});
    this.selectedContact$.pipe(
      take(1)
      ).subscribe({
        next: res => {
          this.dialogRef.close(res);
        },
        error: err => console.error(err)
      })
  }

  removeContactHanlder(_id: string) {
    this.contactService.deleteContact(_id).pipe(
      withLatestFrom(this.contacts$)
    ).subscribe({
      next: ([success, contacts]) => {
        if (success) {
          this.contacts$.next(contacts.filter(x => x._id !== _id))
        }
        else {
          this.openSnackBar("C'è stato un errore");
        }
      },
      error: err => {
        this.openSnackBar("C'è stato un errore");
        console.error(err);
      }
    });
  }

  editContactHanlder(_id: string) {
    this.state$.next({ type: 'edit', id: _id});
  }

  private editContact(contact: Partial<Contact>) : Observable<Contact[]>
  {
    return  this.selectedContact$.pipe(
      take(1),
      map(res => Object.assign({}, res, contact)),
      switchMap(res => this.contactService.patchContact(res)),
      withLatestFrom(this.contacts$),
      map(([patchedContat, contacts]) => contacts.map(x => x._id === patchedContat._id ? patchedContat : x))
      )
  }

  private newContact(contact: Partial<Contact>) : Observable<Contact[]>
  {
    return  this.contactService.addContact(contact).pipe(
      withLatestFrom(this.contacts$),
      map(([newContact, contacts]) => [...contacts, newContact])
    )
  }

  saveContactHanlder(contact: Partial<Contact>) {
    this.state$.pipe(
      take(1),
      switchMap((res : State) => {
        switch(res.type)
        {
          case 'edit': return this.editContact(contact);
          case 'new': return this.newContact(contact);
          default: return this.contacts$;
        }
      })
    ).subscribe({
      next: res => {
        this.contacts$.next(res);
        this.backToList();
      },
      error: err => {
        this.openSnackBar("C'è stato un errore");
        console.error(err);
      }
    });
  }

  backToList(){
    this.state$.next({ type: 'list', id: '' });
  }

  openSnackBar(message: string, style: avaibleStyle = 'success') {
    this.notificationService.show(message, style)
  }
}
