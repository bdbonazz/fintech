export const cardTypes = ["visa", "mastercard"] as const;
export type cardType = typeof cardTypes[number];

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: cardType;
  amount: number;
}

export interface CardForm {
  type: cardType;
  name: string;
  surname: string;
  number: string;
  csc: string;
}
