import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ToString } from '../utils/utils';

export function codiceFiscaleValidator(control: AbstractControl): ValidationErrors | null {
  const codiceFiscale = ToString(control.value);
  const re = new RegExp('[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]');
  return of(re.test(codiceFiscale) ? null : {
    codiceFiscale: `Codice Fiscale is not correct`,
  });
 }

@Directive({
  selector: '[ftCodiceFiscaleValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: CodiceFiscaleValidatorDirective, multi: true}]
})
export class CodiceFiscaleValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
      return codiceFiscaleValidator(control);
    }
}
