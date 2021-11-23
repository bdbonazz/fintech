import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { checkField } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-contact-form',
  template: `
    <form #f="ngForm" (submit)="submitHandler(f)" [ngFormOptions]="{updateOn: 'blur'}">
      <button mat-raised-button color="warn" type="button" (click)="close.emit()" class="btn btn-warn" style="width:100%">
        Annulla
      </button>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Nome</mat-label>
        <input type="text" required [ngModel]="contact.name" name="name" placeholder="Mario" #name="ngModel"
        [ngClass]="cF(name)" matInput >
        <mat-error *ngIf="name.invalid && name.touched">
          Nome richiesto
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Cognome</mat-label>
        <input type="text" required [ngModel]="contact.surname" name="surname" placeholder="Rossi" #surname="ngModel"
        [ngClass]="cF(surname)" matInput >
        <mat-error *ngIf="surname.invalid && surname.touched">
        Cognome richiesto
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>IBAN</mat-label>
        <input type="text" [ngModel]="contact.iban" name="iban" #iban="ngModel" matInput >
      </mat-form-field>
      <br>
      <br>
      <button mat-raised-button color="primary" type="submit" class="btn btn-primary" style="width:100%" [disabled]="f.invalid">
        Aggiungi carta
      </button>
    </form>
  `,
  styles: [
  ]
})
export class ContactFormComponent implements OnInit {

  @Input() contact: Contact | null = null;
  @Output() savedCard = new EventEmitter<Contact>();
  @Output() close = new EventEmitter();

  @ViewChild('f', { read: NgForm }) form!: NgForm;
  constructor()
  {
  }

  ngOnInit(): void {
  }

  submitHandler(form: NgForm): void {
    this.savedCard.emit(form.value as Contact);
  }

  cF(input: NgModel){
    return checkField(input);
  }

  public cleanup(){
    this.form.reset();
  }
}
