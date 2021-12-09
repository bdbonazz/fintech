import { Component, Input, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { checkFieldReactive, EqualsIgnoreCase, IncludesIgnoreCase, removeDuplicates } from 'src/app/shared/utils/utils';
import { codiceFiscaleValidator } from 'src/app/shared/validators/codiceFiscale.validator';
import { Comune, comuni } from 'src/app/shared/utils/listaComuni'
import { provinciaValidator } from 'src/app/shared/validators/provincia.validator';
import { debounceTime, filter, map, startWith } from 'rxjs/operators';
import { comuneValidator } from 'src/app/shared/validators/comune.validator';

@Component({
  selector: 'ft-contribuente',
  template: `
  <form [formGroup]="form" >
    <h1>Contribuente</h1>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>CodiceFiscale</mat-label>
      <input type="text" formControlName="fiscalCode" placeholder="RSSMRA70A41F205Z" [ngClass]="cF('fiscalCode')" matInput >
      <mat-error *ngIf="form.get('fiscalCode')?.errors?.required">Codice Fiscale Richiesto</mat-error>
      <mat-error *ngIf="form.get('fiscalCode')?.errors?.codiceFiscale">Codice Fiscale Errato</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Cognome</mat-label>
      <input type="text" formControlName="surname" placeholder="Rossi" [ngClass]="cF('surname')" matInput >
      <mat-error>Cognome richiesto</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Nome</mat-label>
      <input type="text" formControlName="name" placeholder="Mario" [ngClass]="cF('name')" matInput >
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
      <input type="text"
      formControlName="birthProvince"
      placeholder="MN"
      [ngClass]="cF('birthProvince')"
      [matAutocomplete]="autoProvincia"
      matInput >
      <mat-autocomplete autoActiveFirstOption  #autoProvincia="matAutocomplete">
        <mat-option *ngFor="let provincia of filtroProvince$ | async"
        [value]="provincia">
          {{provincia}}
        </mat-option>
      </mat-autocomplete>
      <mat-error *ngIf="form.get('birthProvince').errors?.required">Provincia di nascita richiesta</mat-error>
      <mat-error *ngIf="form.get('birthProvince').errors?.provincia">Provincia Non Esistente</mat-error>
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Comune di Nascita</mat-label>
      <input type="text"
      formControlName="birthPlace"
      placeholder="Castel Goffredo"
      [ngClass]="cF('birthPlace')"
      [matAutocomplete]="autoComune"
      matInput >
      <mat-autocomplete autoActiveFirstOption  #autoComune="matAutocomplete">
        <mat-option *ngFor="let comune of filtroComuni$ | async"
        [value]="comune.nome">{{comune.nome}}</mat-option>
      </mat-autocomplete>
      <mat-error *ngIf="form.get('birthProvince').errors?.required">Comune di nascita richiesto</mat-error>
      <mat-error *ngIf="form.get('birthProvince').errors?.comune">Comune Non Esistente</mat-error>
    </mat-form-field>
  </form>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContribuenteComponent,
      multi: true,
    },
  ],
})
export class ContribuenteComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() disabled = false;

  form = this.fb.group({
    fiscalCode: ['', Validators.required, codiceFiscaleValidator],
    surname: ['', Validators.required],
    name: ['', Validators.required],
    birthDate: ['', Validators.required],
    sex: ['', Validators.required],
    birthProvince: ['', [Validators.required, provinciaValidator]],
    birthPlace: ['', [Validators.required, comuneValidator]]
  });

  listaProvince$ = new BehaviorSubject<string[]>([]);

  provinciaScritta$ = this.form.get('birthProvince').valueChanges.pipe(
    startWith('')
  )

  filtroProvince$ = combineLatest([this.listaProvince$, this.provinciaScritta$]).pipe(
    map(([listaProvince, provinciaScritta]) => {
      return listaProvince.filter(x => IncludesIgnoreCase(x, provinciaScritta));
    })
  );

  listaComuni$ = new BehaviorSubject<Comune[]>([]);

  comuneScritto$ = this.form.get('birthPlace').valueChanges.pipe(
    startWith('')
  )
  filtroComuni$ = combineLatest([this.listaComuni$,
    this.provinciaScritta$,
    this.comuneScritto$]).pipe(
    map(([listaComuni, provincia, comuneScritto]) => {
      return provincia ?
        listaComuni.filter(x => EqualsIgnoreCase(x.provincia, provincia) && IncludesIgnoreCase(x.nome, comuneScritto))
        : listaComuni.filter(x => IncludesIgnoreCase(x.nome, comuneScritto)).slice(0, 10);
    })
  );

  sub = new Subscription();
  constructor(private fb: FormBuilder) {};

  ngOnInit()
  {
    this.listaComuni$.next(comuni as Comune[]);
    this.listaProvince$.next(this.listaComuni$.getValue()
      .map(x => x.provincia)
      .filter(removeDuplicates)
      .sort());

    this.sub.add(this.form.valueChanges.subscribe(
      res => {
        this.onChange(Object.assign({}, {valid: this.form.valid}, res));
      }))

    /*Se solo un comune risponde ai criteri di ricerca, lo seleziono in automatico
      Permette di scegliere il comune anche prima di aver selezionato la provincia
      Se la provincia o il comune erano scritti in minuscolo, corregge scrivendoli esattamente come sono nel json
    */
   //Se dopo aver scritto un comune cancello caratteri fino ad avere tra i suggeriti più di una voce, comunque bypassa il filter
/*
    this.sub.add(this.filtroComuni$.pipe(
      filter(filtroComuni => filtroComuni.length === 1),
      debounceTime(3000)
    ).subscribe(
      filtroComuni => {
        console.log(filtroComuni.length);
        const comuneRisultante = filtroComuni[0];
        const comuneScelto = this.form.get('birthPlace');
        const provinciaScelta = this.form.get('birthProvince');
        if(!EqualsIgnoreCase(comuneRisultante.nome, comuneScelto.value)) {
          comuneScelto.setValue(comuneRisultante.nome);
          provinciaScelta.setValue(comuneRisultante.provincia);
        }
        if((!!comuneRisultante.provincia && !provinciaScelta.value)) {
          provinciaScelta.setValue(comuneRisultante.provincia);
        }
      }
    ));*/
  }

  ngOnDestroy() { this.sub.unsubscribe() };

  cF(input: string){ return checkFieldReactive(this.form.get(input)); }

  myFilter = (d: Date | null): boolean => { return d == null ? false : new Date().getTime() < d.getTime(); };




  @HostBinding('style.opacity')
  get opacity() { return this.disabled ? 0.2 : 1; }

  // Control Value Accessor
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (!this.disabled) {
      if(value) { this.form.patchValue(value); }
      else { this.form.reset(); }

      this.onChange(value);
      this.onTouched();
    }
  }

  registerOnChange(fn: (_: any) => void) { this.onChange = fn; }

  registerOnTouched(fn: () => void): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
