import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Pipe({
  name: 'filterContacts'
})
export class FilterContactsPipe implements PipeTransform {

  transform(items: Contact[], text: string): Contact[] {
    if(!items.length || !text)
      return items;

      return items.filter(item => {
        return item.name.toLowerCase().includes(text.toLowerCase());
      });
  }
}
