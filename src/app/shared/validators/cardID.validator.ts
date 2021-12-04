import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ToNumber, ToString } from '../utils/utils';
import { CardsService } from 'src/app/api/cards.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CardIDValidator {

  constructor(private cardService: CardsService) {}

  validate(cardID_FieldName: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const cardID_Field = control.get(cardID_FieldName);
      if(!cardID_Field) {
        return of({ cardID: `Missing Field` });
      }

      const cardID = ToString(cardID_Field.value);

      return !cardID
      ? of(null)
      : this.cardService.getCards()
      .pipe(
        map(res =>
          {
            return res.findIndex(x => x._id === cardID) < 0
              ? { cardID: `Card Not Found` }
              : null;
          })
        );
    }
  }
}
