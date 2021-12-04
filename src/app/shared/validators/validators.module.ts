import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldValidatorDirective } from './equal-fields.validator';
import { AmountValidatorDirective } from './amount.validator';
import { IbanValidatorDirective } from './iban.validator';
import { CodiceFiscaleValidatorDirective } from './codiceFiscale.validator';
import { DatesCheckValidatorDirective } from './datesCheck.validator';

const array = [EqualFieldValidatorDirective,
  AmountValidatorDirective,
  IbanValidatorDirective,
  CodiceFiscaleValidatorDirective,
  DatesCheckValidatorDirective];

@NgModule({
  declarations: array,
  imports: [
    CommonModule
  ],
  exports: array
})
export class ValidatorsModule { }
