import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortstring',
  pure: true
})
export class ShortStringPipe implements PipeTransform {
  constructor() {}
  descLen = 50;
  transform(key: string): string {
    return key
    ? key.length > this.descLen
      ? key.substring(0, this.descLen) + '...'
      : key
    : '';
  }
}
