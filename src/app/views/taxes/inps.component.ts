import { Component, Input, HostBinding, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ParentErrorStateMatcher } from 'src/app/shared/errorStateMatcher/parentErrorStateMatcher';
import { datesCheckValidator } from 'src/app/shared/validators/datesCheck.validator';

@Component({
  selector: 'ft-inps',
  template: `
  <ng-container [formGroup]="form">
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
          <mat-error *ngIf="form.get('debito')?.errors?.required">Importo Debito Richiesto</mat-error>
        </mat-form-field>
      </div>
      <div class="col">
        <mat-form-field appearance="fill" class="fullWidth">
          <mat-label>Credito</mat-label>
          <input type="text" formControlName="credito" matInput >
          <mat-error *ngIf="form.get('credito')?.errors?.required">Importo Credito Richiesto</mat-error>
        </mat-form-field>
      </div>
      <div class="col-1">
        <mat-icon matListIcon style="font-size: 50px; color:red" (click)="remove.emit(index)" class="pointer">remove_circle</mat-icon>
      </div>
    </div>
    <mat-error *ngIf="form.errors?.datesCheck">La data di inizio deve essere precedente alla data di fine</mat-error>
  </ng-container>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InpsComponent,
      multi: true,
    },
  ],
})
export class InpsComponent implements ControlValueAccessor, OnDestroy {

  @Input() disabled = false;
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  form = this.fb.group({
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
  })

  sub = new Subscription();
  constructor(private fb: FormBuilder) {
    this.sub.add(this.form.valueChanges.subscribe(res => { this.onChange(Object.assign({}, {valid: this.form.valid}, res)); } ))
  };

  ngOnDestroy() { this.sub.unsubscribe() };



  inpsMatcher = new ParentErrorStateMatcher('datesCheck');

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return new Date().getTime() < date.getTime();
  };




  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.2 : 1;
  }

  // Control Value Accessor
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (!this.disabled) {
      if(value) {
        this.form.patchValue(value);
      }
      else {
        this.form.reset();
      }
      this.onChange(value);
      this.onTouched();
    }
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }


  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
