import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { EqualsIgnoreCase } from '../utils/utils';

export function equalFieldValidator(
  fieldName: string,
  repeatFieldName: string
): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const field1 = c.get(fieldName);
    const field2 = c.get(repeatFieldName);

    return !field1 || !field2
      ? null
      : !field1.value || !field2.value
      ? null
      : !EqualsIgnoreCase(field1.value, field2.value)
      ? { equalField: `Fields are not equals` }
      : null;
  };
}

@Directive({
  selector: '[ftEqualFieldValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualFieldValidatorDirective, multi: true}]
})
export class EqualFieldValidatorDirective implements Validator {
  @Input() Field1: string
  @Input() Field2: string

  validate(control: AbstractControl): ValidationErrors | null {
      return equalFieldValidator(this.Field1, this.Field2)(control);
    }
}
