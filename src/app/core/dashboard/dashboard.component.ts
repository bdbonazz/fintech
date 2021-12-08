import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';
import { UserStore } from '../guards/user.store';

@Component({
  selector: 'ft-dashboard',
  template: `
    <mat-drawer-container style="height:100%">
      <mat-drawer #drawer mode="side" style="height:100%" [opened]="true">
        <h2 matLine>Menu</h2>
        <mat-list style="cursor:pointer">
          <mat-list-item routerLink="home" routerLinkActive="bg-warning" >
            <mat-icon matListIcon>home</mat-icon>
            <h3 matLine>Home</h3>
          </mat-list-item>
          <mat-list-item routerLink="cards" routerLinkActive="bg-warning" >
            <mat-icon matListIcon>credit_card</mat-icon>
            <h3 matLine>Carte</h3>
          </mat-list-item>
          <mat-list-item routerLink="movements" routerLinkActive="bg-warning" >
            <mat-icon matListIcon>receipt_long</mat-icon>
            <h3 matLine>Movimenti</h3>
          </mat-list-item>
          <mat-list-item routerLink="transfer" routerLinkActive="bg-warning" >
            <mat-icon matListIcon>paid</mat-icon>
            <h3 matLine>Trasferisci</h3>
          </mat-list-item>
          <mat-list-item routerLink="appointment" routerLinkActive="bg-warning" >
            <mat-icon matListIcon>event</mat-icon>
            <h3 matLine>Appuntamenti</h3>
          </mat-list-item>
          <mat-list-item routerLink="taxes" routerLinkActive="bg-warning" >
            <mat-icon matListIcon>summarize</mat-icon>
            <h3 matLine>Tasse</h3>
          </mat-list-item>
          <mat-list-item (click)="LogOut()">
            <mat-icon matListIcon>perm_identity</mat-icon>
            <h3 matLine>{{(userStore.user$ | async).displayName}}</h3>
            <mat-divider></mat-divider>
            <h3 matLine>Logout</h3>
          </mat-list-item>
        </mat-list>
      </mat-drawer>
      <div style="height: 100%">
        <mat-toolbar>
          <button mat-icon-button (click)="drawer.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>NgFintech</span>
        </mat-toolbar>
        <br>
        <router-outlet></router-outlet>
      </div>
    </mat-drawer-container>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor(public userStore: UserStore, private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  LogOut(): void{
    this.authService.logout();
  }
}
