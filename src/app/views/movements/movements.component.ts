import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';
import { Movement } from 'src/app/models/movement';

@Component({
  selector: 'ft-movements',
  template: `
  <div class="containter m-3">
    <mat-form-field appearance="fill">
      <mat-label>Seleziona una carta</mat-label>
      <mat-select (selectionChange)="changeCard($event.value)">
        <mat-option *ngFor="let card of cards" [value]="card._id">
          {{card.number}}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <br>
    <mat-label *ngIf="selectedCard" style="font-size: larger; font-weight: bold;">Saldo {{selectedCard.amount | currency}}</mat-label>
    <br>
    <mat-accordion *ngIf="displayedMovements">
      <!--<ft-movement *ngFor="let movement of movements" [movement]="movement"></ft-movement>-->
      <ft-movement *ngFor="let movement of displayedMovements"
      [date]="movement.timestamp | date"
      [type]="movement.type"
      [amount]="movement.amount | currency"
      [title]="movement.title"
      [description]="movement.description"
      ></ft-movement>
    </mat-accordion>
    <br>
    <button mat-button *ngIf="movements && movements.length > movimentiDaMostrare" (click)="LoadMoreMovements()")>Carica Altro</button>
  </div>
  `,
  styles: [
  ]
})
export class MovementsComponent implements OnInit {

  cards: Card[] | null = null;
  selectedCard: Card | null = null;
  movements: Movement[] | null = null;
  displayedMovements: Movement[] | null = null;
  movimentiDaMostrare = 5;

  constructor(private cardService: CardsService)
  {
    cardService.getCards()
      .subscribe(res => this.cards = res, err => console.log(err), () => {});
  }
  ngOnInit(): void {
  }

  changeCard(cardID: string){
    this.selectedCard = this.cards.find(x => x._id === cardID);
    //TODO Ottieni i nuovi movimenti
    this.showMovements();
  }

  showMovements(){
    this.displayedMovements = this.movements.slice(0, this.movimentiDaMostrare);
  }

  LoadMoreMovements(){
    this.movimentiDaMostrare += 5;
    this.showMovements();
  }
}
