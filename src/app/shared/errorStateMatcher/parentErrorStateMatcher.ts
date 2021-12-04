// Il resto degli import puoi trovarli da solo! :)
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class ParentErrorStateMatcher implements ErrorStateMatcher {

  private _errorName: string;
  constructor(errorName: string){
    this._errorName = errorName;
  }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidControl = control?.invalid;
    const invalidParent = control?.parent?.hasError(this._errorName);
    const userActions = control?.dirty || control?.touched || form?.submitted;

    return !!((invalidControl || invalidParent) && userActions);
  }
}
