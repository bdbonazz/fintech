import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { CardForm, cardTypes } from 'src/app/models/card';
import { checkField } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-card-form',
  template: `
  <form #f="ngForm" (submit)="submitHandler(f)" [ngFormOptions]="{updateOn: 'blur'}">
    <h1>Aggiungi Carta</h1>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Tipo di carta</mat-label>
      <mat-select required [ngModel] name="type" #type="ngModel" [ngClass]="cF(type)">
        <mat-option *ngFor="let type of cT" [value]="type">{{type}}</mat-option>
      </mat-select>
      <mat-error *ngIf="type.invalid && type.touched">
        Seleziona un Tipo di Carta
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="halfWidth">
      <mat-label>Nome</mat-label>
      <input type="text" required [ngModel] name="name" placeholder="Mario" #name="ngModel"
      [ngClass]="cF(name)" matInput >
      <mat-error *ngIf="name.invalid && name.touched">
        Nome richiesto
      </mat-error>
    </mat-form-field>
    <mat-form-field appearance="fill" class="halfWidth">
      <mat-label>Cognome</mat-label>
      <input type="text" required [ngModel] name="surname" placeholder="Rossi" #surname="ngModel"
      [ngClass]="cF(surname)" matInput >
      <mat-error *ngIf="surname.invalid && surname.touched">
      Cognome richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>N° Carta</mat-label>
      <input type="text" required [ngModel] name="number" placeholder="0000 1111 2222 3333" #number="ngModel"
      pattern="[0-9]{16}" [ngClass]="cF(number)" matInput >
      <mat-error *ngIf="number.invalid && number.touched">
        Numero Carta Valido richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Codice di Sicurezza</mat-label>
      <input type="text" required [ngModel] name="csc" placeholder="789" #csc="ngModel"
      [ngClass]="cF(csc)" matInput pattern="[0-9]{3}" >
      <mat-error *ngIf="csc.invalid && csc.touched">
        Codice di Sicurezza richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <br>
    <button mat-raised-button color="primary" type="submit" class="btn btn-primary" style="width:100%" [disabled]="f.invalid">
      Aggiungi carta
    </button>
    <br>
    <br>
    <!--<button mat-raised-button color="warn" [routerLink]="'/cards'" class="btn btn-warn" style="width:100%">
      Annulla
    </button>-->
    <button mat-raised-button color="warn" type="button" (click)="close.emit()" class="btn btn-warn" style="width:100%">
      Annulla
    </button>
  </form>
  `,
  styles: [
  ]
})
export class CardFormComponent implements OnInit {
  @Output() savedCard = new EventEmitter<CardForm>();
  @Output() close = new EventEmitter();

  @ViewChild('f', { read: NgForm }) form!: NgForm;
  cT: any
  constructor()
  {
    this.cT = cardTypes;
  }

  ngOnInit(): void {
  }

  submitHandler(form: NgForm): void {
    this.savedCard.emit(form.value as CardForm);
  }

  cF(input: NgModel){
    return checkField(input);
  }

  public cleanup(){
    this.form.reset();
  }

}
