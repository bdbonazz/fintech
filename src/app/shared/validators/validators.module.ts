import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EqualFieldValidatorDirective } from './equal-fields-validator.directive';

const array = [EqualFieldValidatorDirective];

@NgModule({
  declarations: array,
  imports: [
    CommonModule
  ],
  exports: array
})
export class ValidatorsModule { }
