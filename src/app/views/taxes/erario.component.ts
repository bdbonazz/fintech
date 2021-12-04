import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Erario } from 'src/app/models/tax';

@Component({
  selector: 'ft-erario',
  template: `
  <ng-container [formControl]="form">
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
        <mat-icon matListIcon style="font-size: 50px; color:red" (click)="remove.emit(index)" class="pointer">remove_circle</mat-icon>
      </div>
    </div>
  </ng-container>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ErarioComponent,
      multi: true,
    },
  ],
})
export class ErarioComponent implements ControlValueAccessor {

  @Input() disabled = false;
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  constructor(private fb: FormBuilder) { }

  form = this.fb.group({
    codiceTributo: this.fb.control('', Validators.required),
    anno: this.fb.control(new Date().getFullYear(), Validators.required),
    debito: this.fb.control('', Validators.required),
    credito: this.fb.control('', Validators.required)
  });

  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.2 : 1;
  }

  rate(value: Erario): void {
    if (!this.disabled) {
      this.form.patchValue(value);
      this.onChange(value);
      this.onTouched();
    }
  }

  // Control Value Accessor
  onChange = (value: Erario) => {};
  onTouched = () => {};

  writeValue(value: Erario) {
    this.rate(value);
  }

  registerOnChange(fn: (rating: Erario) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
