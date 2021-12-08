import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { EqualsIgnoreCase, ToString } from '../utils/utils';
import { comuni } from 'src/app/shared/utils/listaComuni'

export function comuneValidator(control: AbstractControl): ValidationErrors | null {
  const comune = ToString(control.value);
  return !comune
    ? null
    : comuni.find(x => EqualsIgnoreCase(x.nome, comune))
    ? null
    : { comune: `Il comune non esiste` };
 }

@Directive({
  selector: '[ftComuneValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: ComuneValidatorDirective, multi: true}]
})
export class ComuneValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
      return comuneValidator(control);
    }
}
