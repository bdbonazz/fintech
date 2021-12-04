import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { ToNumber } from '../utils/utils';

export function amountValidator(control: AbstractControl): ValidationErrors | null {
  return ToNumber(control.value) ? null : {
    amount: `Need a number greater than zero`,
  };
 }

@Directive({
  selector: '[ftAmountValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: AmountValidatorDirective, multi: true}]
})
export class AmountValidatorDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
      return amountValidator(control);
    }
}
