import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { checkFieldReactive } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-contact-form',
  template: `
    <form [formGroup]="form" (submit)="submitHandler()">
      <button mat-raised-button color="warn" type="button" (click)="close.emit()" class="btn btn-warn" style="width:100%">
        Annulla
      </button>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Nome</mat-label>
        <input type="text" formControlName="name" placeholder="Mario" [ngClass]="cF('name')" matInput >
        <mat-error>
          Nome richiesto
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Cognome</mat-label>
        <input type="text" formControlName="surname" placeholder="Rossi" [ngClass]="cF('surname')" matInput >
        <mat-error>
        Cognome richiesto
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>IBAN</mat-label>
        <input type="text" formControlName="iban" placeholder="IT00H0000000000000000000000" matInput >
      </mat-form-field>
      <br>
      <br>
      <button mat-raised-button color="primary" type="submit" class="btn btn-primary" style="width:100%" [disabled]="!form.valid">
        Conferma
      </button>
    </form>
  `,
  styles: [
  ]
})
export class ContactFormComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['']
  });

  @Input() contact: Contact | null = null;
  @Output() saveContact = new EventEmitter<Contact>();
  @Output() close = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.contact) {
      this.form.patchValue(this.contact);
    }
  }

  submitHandler(): void {
    this.saveContact.emit(this.form.value);
  }

  cF(input: string){
    return checkFieldReactive(this.form.get('contribuente').get(input));
  }

  public cleanup(){
    this.form.reset();
  }
}
