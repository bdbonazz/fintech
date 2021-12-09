import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'ft-card-list',
  template: `
  <mat-list>
    <div mat-subheader>Carte</div>
    <mat-list-item *ngFor="let card of cards">
      <mat-icon mat-list-icon>credit_card</mat-icon>
      <div mat-line>{{card.number}}<br>{{card.amount | currency}} - {{card.type}}</div>
      <mat-icon mat-list-icon style="order: 10; cursor: pointer" matTooltip="Vedi Movimenti" (click)="Details.emit(card._id)">pageview</mat-icon>
      <mat-icon mat-list-icon style="order: 11; cursor: pointer" matTooltip="Rimuovi" (click)="Delete.emit(card._id)">delete</mat-icon>
    </mat-list-item>
  </mat-list>
  <mat-divider></mat-divider>
  <br>
  <button mat-raised-button color="accent" type="button" class="btn btn-accent fullWidth" (click)="btnClickHandler()">
    Aggiungi
  </button>
  `,
  styles: [
  ]
})
export class CardListComponent implements OnInit {

  @Input() cards: Card[] | null = null
  @Output() Details = new EventEmitter<string>();
  @Output() Delete = new EventEmitter<string>();
  @Output() NewCard = new EventEmitter();


  ngOnInit(): void {
  }

  btnClickHandler(){
    this.NewCard.emit();
  }
}
