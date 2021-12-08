import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Card } from 'src/app/models/card';

export type State = { type: 'list', id: string } | { type: 'new' } | { type: 'edit', id: string }

@Component({
  selector: 'ft-card-select',
  template: `
  <ng-container *ngIf="cards$ | async as cards">
    <mat-form-field appearance="outline" class="fullWidth">
      <mat-label>Cerca</mat-label>
      <input matInput type="text"
        placeholder="Mario Rossi"
        [(ngModel)]="currentSearchText" >
    </mat-form-field>
    <hr>
    <h3>Carte</h3>
    <mat-list role="list">
      <mat-list-item  *ngFor="let card of cards | filterCards: currentSearchText ">
        <mat-icon mat-list-icon>account_circle</mat-icon>
        <div mat-line>{{card.number}}<br>{{card.surname}} {{card.name}}<br>{{card.type}}</div>
        <mat-icon mat-list-icon class="pointer" style="order: 10" matTooltip="Scegli" (click)="dialogRef.close(card);" >done</mat-icon>
      </mat-list-item>
    </mat-list>
  </ng-container>
  `,
  styles: [
  ]
})
export class CardSelectComponent {
  currentSearchText: string = '';
  cards$ = new BehaviorSubject<Card[]>([]);

  constructor(public dialogRef: MatDialogRef<CardSelectComponent>,
    private cardService : CardsService) {
      cardService.getCards().subscribe({
      next: res => this.cards$.next(res),
      error: err => console.error(err)
    })
  }
}
