import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ft-contact',
  template: `
  <ng-container *ngIf="state === 'select'">
      <ft-contact-list
        [contacts]="contacts"
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
      (click)="state = 'create'">
        Nuovo contatto
      </button>
    </ng-container>
    <ng-container *ngIf="state === 'create'">
       <button mat-stroked-button (click)="backToList()">Indietro</button>
      <ft-contact-form
        [contact]="contactToEdit"
        (saveContact)="saveContactHanlder($event)"
      ></ft-contact-form>
    </ng-container>
  `,
  styles: [
  ]
})
export class ContactComponent implements OnInit {

  state: 'select' | 'create' = 'select';
  contacts: Contact[] = [
    {
      _id: 'ciao',
      iban: '111',
      name: 'William',
      surname: 'Bonazzoli'
    }
  ];
  contactToEdit: Contact | null = null;
  constructor(public dialogRef: MatDialogRef<ContactComponent>) {
    console.log(this.state);
   }

  ngOnInit(): void {
    console.log(this.state);
  }

  selectContactHanlder(_id: string) {
    console.log(_id);
    this.dialogRef.close(this.getSelectedContact(_id));
  }


  removeContactHanlder(_id: string) {
    this.contacts = this.contacts.filter(x => x._id !== _id)
  }

  editContactHanlder(_id: string) {
    this.state = 'create';
    this.contactToEdit = this.getSelectedContact(_id)
  }

  saveContactHanlder(contact: Contact) {
    this.contacts = this.contactToEdit
      ? this.contacts.map(x => x._id === contact._id ? contact : x)
      : this.contacts = [...this.contacts, contact];
      this.backToList();
  }

  backToList(){
    this.state = 'select';
    this.contactToEdit = null;
  }

  getSelectedContact(_id: string) : Contact{
    return this.contacts[this.contacts.findIndex(x => x._id === _id)];
  }
}
