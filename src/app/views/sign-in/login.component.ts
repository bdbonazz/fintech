import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ft-login',
  template: `
  <div class="container mt-3" style="align: center">
    <div class="row">
      <div class="card col-4" style="margin: auto">
        <ft-sign-in *ngIf="state == 'signin'" (signin)="signIn($event)"></ft-sign-in>
        <ft-register *ngIf="state == 'register'" (register)="register($event)"></ft-register>
        <br>
        <span style="text-decoration: underline" (click)="changeState()" >{{state == 'signin' ? "Crea un nuovo account" : "Hai già un Account? Accedi"}}</span>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class LoginComponent{
  state: 'signin' | 'register' = 'signin'

  changeState(){
    if (this.state == 'signin')
      this.state = 'register';
    else
      this.state = 'signin';
  }

  signIn(form: NgForm)
  {
    console.log(form.value);
  }

  register(form: NgForm)
  {
    console.log(form.value);
  }
}
