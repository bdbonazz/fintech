import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(public notificationService: NotificationService, private authService: AuthService, private router: Router){}
  changeState(){
    if (this.state == 'signin')
      this.state = 'register';
    else
      this.state = 'signin';
  }

  signIn(form: any)
  {
    //TODO
    console.log(form.value);
    this.authService.login('form.' ,'').subscribe({
      next: (res) => {
        if(res) {
            this.router.navigateByUrl('/dashboard');
        }
        else {
          this.notificationService.show('User not Found', 'warning');
        }
      },
      error: err => console.error(err)
    })
  }

  register(form: any)
  {
    console.log(form);
    this.authService.register(form).subscribe({
      next: (res) => {
        if(res) {
            this.state = 'signin'
        }
        else {
          this.notificationService.show('Error', 'warning');
        }
      },
      error: err => console.error(err)
    })
  }
}
