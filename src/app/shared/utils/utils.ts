import { AbstractControl, NgModel } from "@angular/forms";

//Field
export function checkField(input: NgModel) {
  return { 'is-invalid': input.invalid, 'is-valid': input.valid }
}
export function checkFieldReactive(input: AbstractControl) {
  return { 'is-invalid': input.invalid && (input.touched || !input.pristine), 'is-valid': input.valid }
}

//String
export function ToString(input: any) : string {
  return input ? input.toString() : '';
}
export function GetKey(input: any) : string {
  return ToString(input).trim().toLowerCase();
}
export function EqualsIgnoreCase(input: any, input2: any) : boolean {
  return GetKey(input) === GetKey(input2);
}
export function IncludesIgnoreCase(container: any, content: any) : boolean {
  return content
    ? GetKey(container).includes(GetKey(content))
    : true;
}

//Number
export function ToNumber(input: any) : number {
  const tempo = GetKey(input);
  return tempo ? +tempo : 0;
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

//Array
export function removeDuplicates(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}
