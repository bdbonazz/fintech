import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'ft-contact-list',
  template: `
    <mat-form-field appearance="outline" class="fullWidth">
      <mat-label>Cerca</mat-label>
      <input matInput type="text"
        placeholder="Mario Rossi"
        [(ngModel)]="currentSearchText" >
    </mat-form-field>
    <hr>
    <h3>Contatti</h3>
    <mat-list role="list">
      <mat-list-item  *ngFor="let contact of contacts | filterContacts: currentSearchText ">
        <mat-icon mat-list-icon>account_circle</mat-icon>
        <div mat-line>{{contact.name}}<br>{{contact.iban}}</div>
        <mat-icon mat-list-icon style="order: 10" matTooltip="Scegli" (click)="select.emit(contact._id)" >done</mat-icon>
        <mat-icon mat-list-icon style="order: 11" matTooltip="Modifica" (click)="edit.emit(contact._id)" >mode_edit</mat-icon>
        <mat-icon mat-list-icon style="order: 12" matTooltip="Rimuovi" (click)="delete.emit(contact._id)" >delete</mat-icon>
      </mat-list-item>
    </mat-list>
  `,
  styles: [
  ]
})
export class ContactListComponent implements OnInit {

  currentSearchText: string = '';
  @Input() contacts: Contact[] | null = null;
  @Output() select = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
