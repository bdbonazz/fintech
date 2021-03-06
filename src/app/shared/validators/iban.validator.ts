import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { ToString } from '../utils/utils';

export function ibanValidator(control: AbstractControl): ValidationErrors | null {
  const iban = ToString(control.value);
  return !iban
    ? null
    : new RegExp('[A-Z]{2}[0-9]{2}[A-Z]{1}[0-9]{22}').test(iban) && iban.length == 27
    ? null
    : { iban: `IBAN is not correct` };
 }

@Directive({
  selector: '[ftIbanValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: IbanValidatorDirective, multi: true}]
})
export class IbanValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
      return ibanValidator(control);
    }
}
