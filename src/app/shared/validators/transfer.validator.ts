import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { ToNumber, ToString } from '../utils/utils';
import { CardsService } from 'src/app/api/cards.service';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TransferValidator {

  constructor(private cardService: CardsService) {}

  validate(cardID_FieldName: string, amount_FieldName: string): AsyncValidatorFn {
    return (control: AbstractControl) => {
      const cardID_Field = control.get(cardID_FieldName);
      const amount_Field = control.get(amount_FieldName);
      if(!cardID_Field || !amount_Field) {
        return of({ transfer: `Missing Field` });
      }

      const cardID = ToString(cardID_Field.value);
      const amount = ToNumber(amount_Field.value);

      if (cardID && amount) {
        return this.cardService.getCards()
        .pipe(
          map(res =>
            {
              const index = res.findIndex(x => x._id === cardID);
              return index < 0
              ? { transfer: `Card Not Found` }
              : res[index].amount >= amount
                ? null
                : { transfer: `Not Enough Money` };
            })
          )
      }

      return of(null);
    }
  }
}
