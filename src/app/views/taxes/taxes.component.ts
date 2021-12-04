import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ParentErrorStateMatcher } from 'src/app/shared/errorStateMatcher/parentErrorStateMatcher';
import { checkFieldReactive } from 'src/app/shared/utils/utils';
import { codiceFiscaleValidator } from 'src/app/shared/validators/codiceFiscale.validator';
import { datesCheckValidator } from 'src/app/shared/validators/datesCheck.validator';
@Component({
  selector: 'ft-taxes',
  template: `
    <h1>Contribuente</h1>
    <br>
    <form [formGroup]="form" (submit)="submitHandler()" >
      <ng-container formGroupName="contribuente">
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>CodiceFiscale</mat-label>
          <input type="text" required formControlName="fiscalCode" placeholder="RSSMRA70A41F205Z" [ngClass]="cF('fiscalCode')" matInput >
          <mat-error *ngIf="fiscalCodeErrors?.required">Codice Fiscale Richiesto</mat-error>
          <mat-error *ngIf="fiscalCodeErrors?.codiceFiscale">Codice Fiscale Errato</mat-error>
        </mat-form-field>
        <br>
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Cognome</mat-label>
          <input type="text" required formControlName="surname" placeholder="Rossi" [ngClass]="cF('surname')" matInput >
          <mat-error>Cognome richiesto</mat-error>
        </mat-form-field>
        <br>
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Nome</mat-label>
          <input type="text" required formControlName="name" placeholder="Mario" [ngClass]="cF('name')" matInput >
          <mat-error>Nome richiesto</mat-error>
        </mat-form-field>
        <br>
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Scegli una data</mat-label>
          <input matInput formControlName="birthDate" [ngClass]="cF('birthDate')" [matDatepickerFilter]="myFilter" [matDatepicker]="picker" >
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error>Data richiesta</mat-error>
        </mat-form-field>
        <br>
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Sesso</mat-label>
          <mat-select formControlName="sex" [ngClass]="cF('sex')">
            <mat-option [value]="'M'">M</mat-option>
            <mat-option [value]="'F'">F</mat-option>
          </mat-select>
          <mat-error>Sesso richiesto</mat-error>
        </mat-form-field>
        <br>
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Provincia di Nascita</mat-label>
          <mat-select formControlName="birthProvince" [ngClass]="cF('birthProvince')">
            <mat-option >TODO</mat-option>
          </mat-select>
          <mat-error>Provincia di nascita richiesta</mat-error>
        </mat-form-field>
        <br>
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Comune di Nascita</mat-label>
          <mat-select formControlName="birthPlace" [ngClass]="cF('birthPlace')">
            <mat-option >TODO</mat-option>
          </mat-select>
          <mat-error>Comune di nascita richiesto</mat-error>
        </mat-form-field>
      </ng-container>
      <br>
      <h2>Erario</h2>
      <ng-container formArrayName="erario">
        <ng-container *ngFor="let erarioRow of erario.controls; let i = index" [formGroupName]="i">
          <div class="row">
            <div class="col-3">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Codice Tributo</mat-label>
                <input type="text" formControlName="codiceTributo" matInput >
                <mat-error>Codice Tributo Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col-2">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Anno di riferimento</mat-label>
                <input type="text" formControlName="anno" matInput >
                <mat-error>Anno di riferimento Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col-3">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Importo a debito</mat-label>
                <input type="text" formControlName="debito" matInput >
                <mat-error>Importo a debito Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col-3">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Importo a credito</mat-label>
                <input type="text" formControlName="credito" matInput >
                <mat-error>Importo a credito Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col-1">
              <mat-icon matListIcon style="font-size: 50px; color:red" (click)="remove(erario, i)" class="pointer">remove_circle</mat-icon>
            </div>
          </div>
        </ng-container>
      </ng-container>
      <mat-icon matListIcon style="font-size: 50px;" (click)="addErario()" class="pointer">add_circle</mat-icon>
      <br>
      <br>
      <br>
      <mat-divider></mat-divider>
      <h2>Inps</h2>
      <ng-container formArrayName="inps">
        <ng-container *ngFor="let inpsRow of inps.controls; let i = index" [formGroupName]="i" >
          <div class="row">
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth" >
                <mat-label>Codice Sede</mat-label>
                <input type="text" formControlName="codiceSede" matInput >
                <mat-error>Codice Sede Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Causale Contributo</mat-label>
                <input type="text" formControlName="causaleContributo" matInput >
                <mat-error>Causale Contributo Richiesta</mat-error>
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Causale INPS</mat-label>
                <input type="text" formControlName="codiceInps" matInput >
                <mat-error>Causale INPS Richiesta</mat-error>
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Da</mat-label>
                <input matInput
                formControlName="da"
                [matDatepickerFilter]="myFilter"
                [matDatepicker]="pickerDa"
                [errorStateMatcher]="inpsMatcher">
                <mat-datepicker-toggle matSuffix [for]="pickerDa"></mat-datepicker-toggle>
                <mat-datepicker #pickerDa></mat-datepicker>
                <mat-error>Data Inizio Richiesta</mat-error>
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>A</mat-label>
                <input matInput
                formControlName="a"
                [matDatepickerFilter]="myFilter"
                [matDatepicker]="pickerA"
                [errorStateMatcher]="inpsMatcher" >
                <mat-datepicker-toggle matSuffix [for]="pickerA"></mat-datepicker-toggle>
                <mat-datepicker #pickerA></mat-datepicker>
                <mat-error>Data Fine Richiesta</mat-error>
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Debito</mat-label>
                <input type="text" formControlName="debito" matInput >
                <mat-error>Importo Debito Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col">
              <mat-form-field appearance="fill" class="fullWidth">
                <mat-label>Credito</mat-label>
                <input type="text" formControlName="credito" matInput >
                <mat-error>Importo Credito Richiesto</mat-error>
              </mat-form-field>
            </div>
            <div class="col-1">
              <mat-icon matListIcon style="font-size: 50px; color:red" (click)="remove(inps, i)" class="pointer">remove_circle</mat-icon>
            </div>
          </div>
          <mat-error *ngIf="inpsErrors(i)?.datesCheck">La data di inizio deve essere precedente alla data di fine</mat-error>
        </ng-container>
      </ng-container>
      <mat-icon matListIcon style="font-size: 50px;" (click)="addInps()" class="pointer">add_circle</mat-icon>
      <br>
      <h2>Saldo totale: €0</h2>
    </form>
  `,
  styles: [
  ]
})
export class TaxesComponent {

  constructor(private fb: FormBuilder) { }

  inpsMatcher = new ParentErrorStateMatcher('datesCheck');

  form = this.fb.group({
    contribuente: this.fb.group({
      fiscalCode: ['', Validators.required, codiceFiscaleValidator],
      surname: ['', Validators.required],
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      sex: ['', Validators.required],
      birthProvince: ['', Validators.required],
      birthPlace: ['', Validators.required]
    }),
    erario: this.fb.array([]),
    inps: this.fb.array([]),
  });
  totale$ = this.erario.valueChanges.pipe(
    tap(x => console.log(x))
  );

  public get fiscalCodeErrors() {
    return this.form.get('contribuente').get('fiscalCode')?.errors;
  }

  get erario() {
    return this.form.get('erario') as FormArray;
  }
  totaliErario$ = this.erario.valueChanges.pipe(
    tap(x => console.log(x))
  );

  addErario() {
    this.erario.push(this.fb.group({
      codiceTributo: this.fb.control('', Validators.required),
      anno: this.fb.control(new Date().getFullYear(), Validators.required),
      debito: this.fb.control('', Validators.required),
      credito: this.fb.control('', Validators.required)
    }));
  }

  get inps() {
    return this.form.get('inps') as FormArray;
  }
  totaliInps$ = this.erario.valueChanges.pipe(
    tap(x => console.log(x))
  );

  public inpsErrors(index: number) {
    return this.inps.at(index)?.errors;
  }

  addInps() {
    this.inps.push(this.fb.group({
      codiceSede: this.fb.control('', Validators.required),
      causaleContributo: this.fb.control('', Validators.required),
      codiceInps: this.fb.control('', Validators.required),
      da: this.fb.control('', Validators.required),
      a: this.fb.control('', Validators.required),
      debito: this.fb.control('', Validators.required),
      credito: this.fb.control('', Validators.required)
    },
    {
      validators: datesCheckValidator('da', 'a')
    }));
  }

  remove(array: FormArray, index: number) {
    array.removeAt(index);
  }

  clear(array: FormArray) {
    array.clear();
  }

  submitHandler(){

  }

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return new Date().getTime() < date.getTime();
  };

  cF(input: string){
    return checkFieldReactive(this.form.get('contribuente').get(input));
  }
}
