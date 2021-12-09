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

//Dato che la data è scritta secondo lo stile americano, confronto singolarmente giorno, mese e anno
export function sameDateFromDate(slotDate: string, date: Date) : boolean {
  if (!date) {
    return false;
  }

  const valori: string[] = date.toLocaleDateString().split('/');
  const dayToday: number = +valori[0]
  const monthToday: number = +valori[1]
  const yearToday: number = +valori[2]
  return sameDateFromDMY(slotDate, dayToday, monthToday, yearToday);
}

//Dato che la data è scritta secondo lo stile americano, confronto singolarmente giorno, mese e anno
export function sameDateFromDMY(slotDate: string, day: number, month: number, year: number) : boolean {
  if (!slotDate) {
    return false;
  }
  const valori: string[] = slotDate.split('/');
  if (valori.length < 3){
    return false;
  }

  return day === +valori[1] && month === +valori[0] && year === +valori[2];
}

//Dato che la data è scritta secondo lo stile americano, la riporto nel formato europeo
export function americanToSmart(date: string) : string {
  const valori: string[] = date.split('/');
  return [
    String(valori[1]).padStart(2, '0'),
    String(valori[0]).padStart(2, '0'),
    String(valori[2]).padStart(4, '0')
  ].join("/");
}

//Array
export function removeDuplicates(value: any, index: number, self: any[]) {
  return self.indexOf(value) === index;
}
