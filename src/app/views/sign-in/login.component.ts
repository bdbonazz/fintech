import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'ft-login',
  template: `
  <div class="container mt-3" style="align: center">
    <div class="row">
      <div class="card col-4" style="margin: auto">
        <ft-sign-in *ngIf="state == 'signin'" (signin)="signIn($event)"></ft-sign-in>
        <ft-register *ngIf="state == 'register'" (register)="register($event)"></ft-register>
        <br>
        <span class="pointer" style="text-decoration: underline" (click)="changeState()" >{{state == 'signin' ? "Crea un nuovo account" : "Hai già un Account? Accedi"}}</span>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class LoginComponent{
  state: 'signin' | 'register' = 'signin'

  constructor(public notificationService: NotificationService, private authService: AuthService, private router: Router) { }

  changeState() { this.state = this.state == 'signin' ? 'register' : 'signin'; }

  signIn(form: any)
  {
    this.authService.login(form.email, form.password).subscribe({
      next: (res) => {
        if(res) { this.router.navigateByUrl('/dashboard/cards'); }
        else { this.notificationService.show('User not Found', 'danger'); }
      },
      error: err => console.error(err)
    })
  }

  register(form: any)
  {
    this.authService.register({
      email: form.email,
      name: form.name,
      surname: form.surname,
      password: form.password
    }).subscribe({
      next: (res) => {
        if(res) { this.signIn(form); }
        else { this.notificationService.show('Error', 'danger'); }
      },
      error: err => console.error(err)
    })
  }
}
