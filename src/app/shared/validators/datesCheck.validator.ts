import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function datesCheckValidator(
  fromDateName: string,
  toDateName: string
): ValidatorFn {
  return (c: AbstractControl): ValidationErrors | null => {
    const fromDateField = c.get(fromDateName);
    const toDateField = c.get(toDateName);

    if(!fromDateField || !toDateField) {
      return null;
    }
    const fromDateValue = fromDateField.value;
    const toDateValue = toDateField.value;
    if(!fromDateValue || !toDateValue) {
      return null;
    }

    const fromDate = new Date(fromDateValue);
    const toDate = new Date(toDateValue);

    if (fromDate > toDate
    ) {
      return {
        datesCheck: `Date Error`,
      };
    }
    return null;
  };
}

@Directive({
  selector: '[ftDatesCheckValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: DatesCheckValidatorDirective, multi: true}]
})
export class DatesCheckValidatorDirective implements Validator {
  @Input() FromDate: string
  @Input() ToDate: string

  validate(control: AbstractControl): ValidationErrors | null {
      return datesCheckValidator(this.FromDate, this.ToDate)(control);
    }
}
