import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CardsService } from 'src/app/api/cards.service';
import { TransferService } from 'src/app/api/transfer.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Card } from 'src/app/models/card';
import { Contact } from 'src/app/models/contact';
import { DialogOverviewComponent } from 'src/app/shared/utils/dialog-overview.component';
import { checkField, checkFieldReactive } from 'src/app/shared/utils/utils';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'ft-transfer',
  template: `
  <form [formGroup]="form" (submit)="submitHandler()" >
    <button mat-raised-button color="accent" class="btn btn-accent" style="width:100%" type="button" (click)="getContact()" >
      Lista Contatti
    </button>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Nome</mat-label>
      <input type="text" required formControlName="name" placeholder="Mario" [ngClass]="cF('name')" matInput >
      <mat-error>
        Nome richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Cognome</mat-label>
      <input type="text" required formControlName="surname" placeholder="Rossi" [ngClass]="cF('surname')" matInput >
      <mat-error>
      Cognome richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>IBAN</mat-label>
      <input type="text" required formControlName="iban" placeholder="IT00H0000000000000000000000" [ngClass]="cF('iban')" matInput >
      <mat-error>
      IBAN richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Importo</mat-label>
      <input type="text" required formControlName="surname" placeholder="10.000€" [ngClass]="cF('amount')" matInput >
      <mat-error>
      Importo richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
      <mat-label>Seleziona una carta</mat-label>
      <mat-select required formControlName="cardId" [ngClass]="cF('cardId')">
        <mat-option *ngFor="let card of cards" [value]="card._id">
          {{card.number}}
        </mat-option>
      </mat-select>
      <mat-error>
      Carta richiesta
      </mat-error>
    </mat-form-field>
    <br>
    <br>
    <button mat-raised-button color="primary" type="submit" class="btn btn-primary" style="width:100%" [disabled]="form.invalid">
      Trasferisci Denaro
    </button>
    <br>
    <br>
    <!--<button mat-raised-button color="warn" [routerLink]="'/cards'" class="btn btn-warn" style="width:100%">
      Annulla
    </button>-->
  </form>
  `,
  styles: [
  ]
})
export class TransferComponent {

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['', Validators.required],
    amount: ['', Validators.required],
    cardId: ['', Validators.required],
  });

  cards: Card[] | null = null;
  constructor(
    private cardService: CardsService,
    private transferService: TransferService,
    public notificationService: NotificationService,
    public dialog: MatDialog,
    private fb: FormBuilder)
  {
    cardService.getCards()
      .subscribe({
        next: res => this.cards = res,
        error: err => console.error(err)
      });
  }
  getContact(): void {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Contact) => {
      if(result)
      {
        this.form.patchValue({
          name: result.name,
          surname: result.surname,
          iban: result.iban,
        });
      }
    });
  }

  submitHandler(): void {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.transferService.addTransfer(this.form.value).subscribe({
          next: res => {
            if(res) {
              this.notificationService.show("Trasferimento Effettuato")
              this.cleanup();
            } else {
              this.notificationService.show("C'è stato un errore nel trasferimento")
            }
          }
        });

      }
    });

  }

  cF(input: string){
    return checkFieldReactive(this.form.get(input));
  }

  public cleanup(){
    this.form.reset();
  }

}
