import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ToString } from '../utils/utils';
import { CardsService } from 'src/app/api/cards.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CardIDValidator {

  constructor(private cardService: CardsService) {}

  validate(cardID_FieldName: string = '', parent: boolean = false): AsyncValidatorFn {
    return (control: AbstractControl) => {
      let cardID = '';
      if(parent) {
        const cardID_Field = control.get(cardID_FieldName);
        if(!cardID_Field) {
          return of({ cardID: `Missing Field` });
        }
        cardID = ToString(cardID_Field.value);
      }
      else {
        cardID = ToString(control.value);
      }

      return !cardID
      ? of(null)
      : this.cardService.getCards()
      .pipe(
        map(res =>
          res.findIndex(x => x._id === cardID) < 0
          ? { cardID: `Card Not Found` }
          : null
        )
      );
    }
  }
}
