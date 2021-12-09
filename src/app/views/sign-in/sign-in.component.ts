import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { checkField } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-sign-in',
  template: `
  <form #f="ngForm" (submit)="submitHandler(f)" >
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Email</mat-label>
      <mat-icon matPrefix>perm_identity</mat-icon>
      <input matInput
      type="text"
      required
      email
      [ngModel]
      [ngClass]="cF(email)"
      name="email"
      placeholder="you@example.com"
      #email="ngModel"
      >
    </mat-form-field>
    <br>
    <mat-form-field appearance="fill" class="fullWidth">
      <mat-label>Password</mat-label>
      <mat-icon matPrefix>lock</mat-icon>
      <input matInput
      [type]="GetPwType()"
      required
      [ngModel]
      [ngClass]="cF(password)"
      name="password"
      placeholder="Password"
      #password="ngModel"
      >
      <mat-icon class="pointer" matSuffix (click)="showPassword = !showPassword">{{showPassword ? "visibility_off" : "visibility"}}</mat-icon>
    </mat-form-field>
    <br>
    <button mat-raised-button
    color="primary"
    type="submit"
    class="btn btn-primary fullWidth"
    [disabled]="!f.valid"
    >
      Accedi
    </button>
  </form>
  <!--<br>
  <span style="text-decoration: underline" [routerLink]="'../register'">Crea un nuovo account</span>-->
  `,
  styles: [`

    `]
})
export class SignInComponent {
  @Output() signin = new EventEmitter<NgForm>()
  showPassword: boolean = false;

  constructor() { }

  submitHandler(form: NgForm): void {
    if(!form.valid)
      return;
    /*this.http.post<any>(environment.apiUrl, form.value)
      .subscribe(() => {
        form.reset();
      });*/
    this.signin.emit(form.value);
  }

  cF(input: NgModel) { return checkField(input); }

  GetPwType(): string { return this.showPassword ? 'text' : 'password'; }
}
