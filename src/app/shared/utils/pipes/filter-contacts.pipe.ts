import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { IncludesIgnoreCase } from '../utils';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(items: Contact[], text: string): Contact[] {
    if(!items.length || !text)
      return items;

      return items.filter(item => {
        return IncludesIgnoreCase(item.name, text);
      });
  }
}
