import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TransferService } from 'src/app/api/transfer.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Contact } from 'src/app/models/contact';
import { DialogOverviewComponent } from 'src/app/shared/utils/dialog-overview.component';
import { checkFieldReactive } from 'src/app/shared/utils/utils';
import { amountValidator } from 'src/app/shared/validators/amount.validator';
import { CardIDValidator } from 'src/app/shared/validators/cardID.validator';
import { ibanValidator } from 'src/app/shared/validators/iban.validator';
import { TransferValidator } from 'src/app/shared/validators/transfer.validator';
import { loadCards } from '../cards/store/cards.actions';
import { selectCardsState } from '../cards/store/cards.selectors';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'ft-transfer',
  template: `
  <form [formGroup]="form" #formDirective="ngForm" (submit)="submitHandler(formDirective)" >
    <button mat-raised-button color="accent" class="btn btn-accent fullWidth" type="button" (click)="getContact()" >
      Lista Contatti
    </button>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Nome</mat-label>
      <input type="text" formControlName="name" placeholder="Mario" [ngClass]="cF('name')" matInput >
      <mat-error *ngIf="form.get('name').touched">
        Nome richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Cognome</mat-label>
      <input type="text" formControlName="surname" placeholder="Rossi" [ngClass]="cF('surname')" matInput >
      <mat-error *ngIf="form.get('surname').touched">
      Cognome richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>IBAN</mat-label>
      <input type="text" formControlName="iban" placeholder="IT00H0000000000000000000000"
      [ngClass]="cF('iban')" matInput >
      <mat-error *ngIf="ibanErrors?.required && form.get('iban').touched">
      IBAN richiesto
      </mat-error>
      <mat-error *ngIf="ibanErrors?.iban">
      IBAN non corretto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Importo</mat-label>
      <input type="text" formControlName="amount" placeholder="10.000€" [ngClass]="cF('amount')" matInput >
      <mat-error *ngIf="form.get('amount').touched">
      Importo richiesto
      </mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill">
      <mat-label>Seleziona una carta</mat-label>
      <mat-select formControlName="cardId" [ngClass]="cF('cardId')">
        <mat-option *ngFor="let card of cards$ | async" [value]="card._id">
          {{card.number}}
        </mat-option>
      </mat-select>
      <mat-error *ngIf="form.get('cardId').touched">
      Carta richiesta
      </mat-error>
    </mat-form-field>
    <br>
    <br>
    <span *ngIf="form.errors?.transfer" style="color:red">{{form.errors.transfer}}</span>
    <button mat-raised-button color="primary" type="submit" class="btn btn-primary fullWidth" [disabled]="!form.valid">
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
export class TransferComponent implements OnInit {

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['', [Validators.required, ibanValidator ]],
    amount: ['', [Validators.required, amountValidator]],
    cardId: ['', Validators.required, this.cardIDValidator.validate()],
  },
  {
    asyncValidators: this.transferValidator.validate('cardId', 'amount')
  });

  public get ibanErrors() {
    return this.form.get('iban').errors;
  }

  cards$ = this.store.select(selectCardsState);
  constructor(
    private store: Store,
    private transferService: TransferService,
    public notificationService: NotificationService,
    private transferValidator: TransferValidator,
    private cardIDValidator: CardIDValidator,
    public dialog: MatDialog,
    private fb: FormBuilder
    ) { }

  ngOnInit() { this.store.dispatch(loadCards()); }

  getContact(): void {
    this.dialog.open(ContactComponent, {
      width: '500px'
    }).afterClosed()
    .subscribe((result: Contact) => {
      if(result) {
        this.form.patchValue({
          name: result.name,
          surname: result.surname,
          iban: result.iban,
        });
      }
    });
  }

  submitHandler(formDirective: FormGroupDirective): void {
    this.dialog.open(DialogOverviewComponent, {
      width: '250px'
    }).afterClosed()
    .subscribe(result => {
      if(result)
      {
        this.transferService.addTransfer(this.form.value).subscribe({
          next: res => {
            if(res) {
              this.notificationService.show("Trasferimento Effettuato")
              this.cleanup(formDirective);
            } else {
              this.notificationService.show("C'è stato un errore nel trasferimento")
            }
          }
        });
      }
    });

  }

  cF(input: string) { return checkFieldReactive(this.form.get(input)); }

  public cleanup(formDirective: FormGroupDirective){
    this.form.reset();
    /*Object.keys(this.form.controls).forEach(key => {
      this.form.get(key).setErrors(null) ;
    });*/
    if(formDirective){
      formDirective.resetForm();
    }
  }
}
