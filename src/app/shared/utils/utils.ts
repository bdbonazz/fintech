import { AbstractControl, NgModel } from "@angular/forms";

//Field
export function checkField(input: NgModel) {
  return { 'is-invalid': input.invalid, 'is-valid': input.valid }
}
export function checkFieldReactive(input: AbstractControl) {
  return { 'is-invalid': input.invalid, 'is-valid': input.valid }
}

//String
export function ToString(input: string) : string {
  return input ? input : '';
}
export function EqualsIgnoreCase(input: string, input2: string) : boolean {
  return ToString(input).toLowerCase() === ToString(input2).toLowerCase();
}

//DateTime
export function dateToString(d: Date) : string {
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }
  return [day, month, year].join('/');
}
