import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { EqualsIgnoreCase, ToString } from '../utils/utils';
import { comuni } from 'src/app/shared/utils/listaComuni'

export function provinciaValidator(control: AbstractControl): ValidationErrors | null {
  const provincia = ToString(control.value);
  return !provincia
    ? null
    : comuni.find(x => EqualsIgnoreCase(x.provincia, provincia))
    ? null
    : { provincia: `La provincia non esiste` };
 }

@Directive({
  selector: '[ftProvinciaValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ProvinciaValidatorDirective, multi: true}]
})
export class ProvinciaValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
      return provinciaValidator(control);
    }
}
