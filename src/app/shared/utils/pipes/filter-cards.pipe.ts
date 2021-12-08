import { Pipe, PipeTransform } from '@angular/core';
import { Card } from 'src/app/models/card';
import { IncludesIgnoreCase } from '../utils';

@Pipe({
  name: 'filterCards'
})
export class FilterCardsPipe implements PipeTransform {

  transform(items: Card[], text: string): Card[] {
    if(!items.length || !text)
      return items;

      return items.filter(item => {
        return IncludesIgnoreCase(item.number, text)
          || IncludesIgnoreCase(item.owner, text)
          || IncludesIgnoreCase(item.type, text);
      });
  }
}
