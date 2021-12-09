import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CardForm, cardTypes } from 'src/app/models/card';
import { checkFieldReactive } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-card-form',
  template: `
  <form [formGroup]="form" (submit)="submitHandler()" >
    <h1>Aggiungi Carta</h1>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Tipo di carta</mat-label>
      <mat-select formControlName="type" [ngClass]="cF('type')">
        <mat-option *ngFor="let type of cT" [value]="type">{{type}}</mat-option>
      </mat-select>
      <mat-error>
        Seleziona un Tipo di Carta
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="halfWidth">
      <mat-label>Nome</mat-label>
      <input type="text" formControlName="name" placeholder="Mario" [ngClass]="cF('name')" matInput >
      <mat-error>
        Nome richiesto
      </mat-error>
    </mat-form-field>
    <mat-form-field appearance="fill" class="halfWidth">
      <mat-label>Cognome</mat-label>
      <input type="text" formControlName="surname" placeholder="Rossi" [ngClass]="cF('surname')" matInput >
      <mat-error>
      Cognome richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>N° Carta</mat-label>
      <input type="text" formControlName="number" placeholder="0000 1111 2222 3333" [ngClass]="cF('number')" matInput >
      <mat-error>
        Numero Carta Valido richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Codice di Sicurezza</mat-label>
      <input type="text" formControlName="csc" placeholder="789" [ngClass]="cF('csc')" matInput>
      <mat-error>
        Codice di Sicurezza richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <br>
    <mat-spinner *ngIf="loading" [diameter]="30"></mat-spinner>
    <button
    *ngIf="!loading"
    mat-raised-button
    [disabled]="!form.valid"
    color="primary"
    type="submit"
    class="btn btn-primary fullWidth"
    >
      Aggiungi carta
    </button>
    <br>
    <br>
    <!--<button mat-raised-button color="warn" [routerLink]="'/cards'" class="btn btn-warn" style="width:100%">
      Annulla
    </button>-->
    <button
    mat-raised-button
    (click)="close.emit()"
    color="warn"
    type="button"
    class="btn btn-warn fullWidth"
    >
      Annulla
    </button>
  </form>
  `,
  styles: [
  ]
})
export class CardFormComponent implements OnChanges {
  @Input() clearCount: number = 0
  @Input() loading: boolean = false
  @Output() savedCard = new EventEmitter<CardForm>();
  @Output() close = new EventEmitter();

  form = this.fb.group({
    type: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    number: ['', [Validators.required, Validators.pattern("[0-9]{16}")]],
    csc: ['', [Validators.required, Validators.pattern("[0-9]{3}")]]
  });

  ngOnChanges(changes: SimpleChanges) { if (changes.clearCount) { this.form.reset(); } }

  cT: any
  constructor(private fb: FormBuilder) { this.cT = cardTypes; }

  submitHandler(): void { this.savedCard.emit(this.form.value); }

  cF(input: string){ return checkFieldReactive(this.form.get(input)); }
}
