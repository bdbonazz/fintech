import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Erario } from 'src/app/models/tax';

@Component({
  selector: 'ft-erario',
  template: `
  <ng-container [formGroup]="form">
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
export class ErarioComponent implements ControlValueAccessor, OnDestroy {

  @Input() disabled = false;
  @Input() index: number = 0;
  @Output() remove = new EventEmitter<number>();

  form = this.fb.group({
    codiceTributo: this.fb.control('', Validators.required),
    anno: this.fb.control(new Date().getFullYear(), Validators.required),
    debito: this.fb.control('', Validators.required),
    credito: this.fb.control('', Validators.required)
  });

  sub = new Subscription();
  constructor(private fb: FormBuilder) {
    this.sub.add(this.form.valueChanges.subscribe(res => { this.onChange(Object.assign({}, {valid: this.form.valid}, res)); } ))
  };

  ngOnDestroy() { this.sub.unsubscribe() };




  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.2 : 1;
  }

  // Control Value Accessor
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any) {
    if (!this.disabled) {
      this.form.patchValue(value);
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
