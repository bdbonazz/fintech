import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { CardsService } from 'src/app/api/cards.service';
import { avaibleStyle, NotificationService } from 'src/app/core/services/notification.service';
import { Card, CardForm } from 'src/app/models/card';
import { CardFormComponent } from './card-form.component';

@Component({
  selector: 'ft-cards',
  template: `
  <mat-drawer-container style="height: 100%; padding: 20px">
  <ft-card-list
  [cards]="cards"
  (NewCard)="drawer.toggle()"
  (Delete)="deleteCard($event)"
  (Details)="cardDetail($event)"
  ></ft-card-list>
  <mat-drawer #drawer mode="side" position="end" style="padding: 20px; height:100%">
    <ft-card-form #cardForm
    (savedCard)="saveCard($event)"
    (close)="closeCardForm()"
    ></ft-card-form>
  </mat-drawer>
</mat-drawer-container>

  `,
  styles: [`
  `]
})
export class CardsComponent implements OnInit {

  @ViewChild('drawer', { read: MatDrawer }) drawerRef!: MatDrawer;
  @ViewChild('cardForm', { read: CardFormComponent }) cardFormRef!: CardFormComponent;

  cards: Card[] | null = null;

  constructor(public notificationService: NotificationService, private cardService: CardsService)
  {
    cardService.getCards().subscribe(
      res => {
      this.cards = res
    },
    err => console.log(err),
    () => {}
    );
  }

  ngOnInit(): void {
  }

  deleteCard(cardID: string)
  {
    this.cardService.deleteCard(cardID).subscribe(res => {
      if(res) {
        this.cards = this.cards.filter(x => x._id !== cardID);
        this.openSnackBar('Carta Rimossa con Successo')
      }
      else {
        this.openSnackBar("C'è stato un problema nella rimozione della carta'", 'danger')
      }
    },
    err => console.log(err),
    () => {});
  }

  cardDetail(cardID: string)
  {
    //ToDo
    console.log(cardID);
  }

  saveCard(newCard: CardForm){
    console.log(newCard);
    this.cardService.addCard(newCard).subscribe(
      res => {
      this.cards = [...this.cards, res];
      this.pulisciForm();
      this.openSnackBar('Carta Aggiunta con Successo');
      },
      err => {
        console.log(err);
        this.openSnackBar("C'è stato un problema nel salvataggio della carta", 'danger');
      },
      () => {}
    );
  }

  closeCardForm(){
    this.pulisciForm();
  }

  pulisciForm(){
    this.cardFormRef.cleanup();
    this.drawerRef.toggle();
  }

  openSnackBar(message: string, style: avaibleStyle = 'success') {
    this.notificationService.show(message, style)
  }

  //openSnackBar(message: string, action: string) {
  //  this.snackBar.open(message, action);
  //}
}
