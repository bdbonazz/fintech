import { Component } from '@angular/core';
import { AuthService } from 'src/app/api/auth.service';
import { UserStore } from '../guards/user.store';

@Component({
  selector: 'ft-dashboard',
  template: `
    <mat-drawer-container style="height:100%" *ngIf="(userStore.user$ | async) as userStore">
      <mat-drawer #drawer mode="side" style="height:100%; background-color:#eeffff" [opened]="true">
        <h2 matLine>Menu</h2>
        <mat-list style="cursor:pointer">
          <mat-list-item routerLink="home" routerLinkActive="rainbow1" >
            <mat-icon matListIcon>home</mat-icon>
            <h3 matLine>Home</h3>
          </mat-list-item>
          <mat-list-item routerLink="cards" routerLinkActive="rainbow2" >
            <mat-icon matListIcon>credit_card</mat-icon>
            <h3 matLine>Carte</h3>
          </mat-list-item>
          <mat-list-item routerLink="movements" routerLinkActive="rainbow3" >
            <mat-icon matListIcon>receipt_long</mat-icon>
            <h3 matLine>Movimenti</h3>
          </mat-list-item>
          <mat-list-item routerLink="transfer" routerLinkActive="rainbow4" >
            <mat-icon matListIcon>paid</mat-icon>
            <h3 matLine>Trasferisci</h3>
          </mat-list-item>
          <mat-list-item routerLink="appointment" routerLinkActive="rainbow5" >
            <mat-icon matListIcon>event</mat-icon>
            <h3 matLine>Appuntamenti</h3>
          </mat-list-item>
          <mat-list-item routerLink="taxes" routerLinkActive="rainbow6" >
            <mat-icon matListIcon>summarize</mat-icon>
            <h3 matLine>Tasse</h3>
          </mat-list-item>
          <mat-list-item (click)="LogOut()">
            <mat-icon matListIcon>perm_identity</mat-icon>
            <h3 matLine>{{userStore.displayName}}</h3>
            <mat-divider></mat-divider>
            <h3 matLine>Logout</h3>
          </mat-list-item>
        </mat-list>
      </mat-drawer>
      <div style="height: 100%">
        <mat-toolbar class="bg-primary">
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
  styles: [`
    .rainbow1 {
      background-color: violet;
    }
    .rainbow2 {
      background-color: blue;
    }
    .rainbow3 {
      background-color: green;
    }
    .rainbow4 {
      background-color: yellow;
    }
    .rainbow5 {
      background-color: orange;
    }
    .rainbow6 {
      background-color: red;
    }
    `
  ]
})
export class DashboardComponent {

  constructor(
    public userStore: UserStore,
    private authService: AuthService
    ) { }

  LogOut(): void { this.authService.logout(); }
}
