import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { CardsService } from 'src/app/api/cards.service';
import { avaibleStyle, NotificationService } from 'src/app/core/services/notification.service';
import { Card, CardForm } from 'src/app/models/card';
import { CardFormComponent } from './card-form.component';

@Component({
  selector: 'ft-cards',
  template: `
  <mat-drawer-container style="height: 100%; padding: 20px">
  <ft-card-list
  [cards]="cards$ | async"
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

  cards$ = new BehaviorSubject<Card[]>([]);

  constructor(public notificationService: NotificationService, private cardService: CardsService, private router: Router)
  {
    cardService.getCards().subscribe({
      next: res => this.cards$.next(res),
      error : err => console.error(err)
    });
  }

  ngOnInit(): void {
  }

  deleteCard(cardID: string)
  {
    this.cardService.deleteCard(cardID).pipe(
      withLatestFrom(this.cards$)
    ).subscribe({
      next: ([success, cards]) => {
        if(success) {
          this.cards$.next(cards.filter(x => x._id !== cardID));
          this.openSnackBar('Carta Rimossa con Successo')
        }
        else {
          this.openSnackBar("C'è stato un problema nella rimozione della carta'", 'danger')
        }
      },
      error: err => console.error(err)
    });
  }

  cardDetail(cardID: string)
  {
    console.log(cardID);
    this.router.navigate(['dashboard','movements',cardID])
  }

  saveCard(newCard: CardForm){
    console.log(newCard);
    this.cardService.addCard(newCard).pipe(
      withLatestFrom(this.cards$)
    ).subscribe(
      {
        next: ([addedCard, cards]) => {
          this.cards$.next([...cards, addedCard]);
          this.pulisciForm();
          this.openSnackBar('Carta Aggiunta con Successo');
        },
        error: err => {
          console.error(err);
          this.openSnackBar("C'è stato un problema nel salvataggio della carta", 'danger');
        }
      }
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
