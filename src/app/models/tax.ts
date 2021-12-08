export interface Contribuente {
  _id: string;
  fiscalCode: string;
  surname: string;
  name: string;
  birthDate: Date;
  sex: string;
  birthProvince: string;
  birthPlace: string;
}

export interface Erario {
  _id: string;
  codiceTributo: string;
  anno: number;
  debito: number;
  credito: number;
}

export interface Inps {
  _id: string;
  codiceSede: string;
  causaleContributo: string;
  codiceInps: string;
  da: Date;
  a: Date;
  debito: number;
  credito: number;
}

export interface Totali {
  totaleDebito: number;
  totaleCredito: number;
}

