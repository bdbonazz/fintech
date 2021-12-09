import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ParentErrorStateMatcher } from 'src/app/shared/errorStateMatcher/parentErrorStateMatcher';
import { checkField } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-register',
  template: `
    <form #f="ngForm"
    (submit)="submitHandler(f)"
    ftEqualFieldValidator
    [Field1]="'password'"
    [Field2]="'password2'"
    >
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
        <mat-error *ngIf="!email.valid && email.touched">
          Email richiesta
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Nome</mat-label>
        <mat-icon matPrefix>perm_identity</mat-icon>
        <input matInput
        type="text"
        required
        [ngModel]
        [ngClass]="cF(name)"
        name="name"
        placeholder="Mario"
        #name="ngModel"
        >
        <mat-error *ngIf="!name.valid && name.touched">
          Nome richiesto
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Cognome</mat-label>
        <mat-icon matPrefix>perm_identity</mat-icon>
        <input matInput
        type="text"
        required
        [ngModel]
        [ngClass]="cF(surname)"
        name="surname"
        placeholder="Rossi"
        #surname="ngModel"
        >
        <mat-error *ngIf="!surname.valid && surname.touched">
        Cognome richiesto
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input matInput
        required
        [ngModel]
        [ngClass]="cF(password)"
        [type]="GetPwType()"
        [errorStateMatcher]="passwordMatcher"
        name="password"
        placeholder="Password"
        #password="ngModel"
        >
        <mat-icon matSuffix class="pointer" (click)="showPassword = !showPassword">{{showPassword ? "visibility_off" : "visibility"}}</mat-icon>
        <mat-error *ngIf="!password.valid && password.touched">
        Password richiesta
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Ripeti la Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input matInput
        required
        [ngModel]
        [ngClass]="cF(password2)"
        [errorStateMatcher]="passwordMatcher"
        [type]="GetPwType()"
        name="password2"
        placeholder="Ripeti la Password"
        #password2="ngModel"
        >
        <mat-icon matSuffix class="pointer" (click)="showPassword = !showPassword">{{showPassword ? "visibility_off" : "visibility"}}</mat-icon>
        <mat-error *ngIf="!password2.valid && password2.touched">
        Conferma Password richiesta
        </mat-error>
      </mat-form-field>
      <span style="color: red" *ngIf="f.errors?.equalField">
          Passwords Don't Match.
      </span>
      <br>
      <button mat-raised-button
      color="primary"
      type="submit"
      class="btn btn-primary"
      style="width:100%"
      [disabled]="!f.valid"
      >
        Registra
      </button>
    </form>
    <!--<br>
    <span style="text-decoration: underline" [routerLink]="'../signin'">Hai già un Account? Accedi</span>-->
  `,
  styles: [
  ]
})
export class RegisterComponent {
  @Output() register = new EventEmitter<NgForm>()
z
  showPassword: boolean = false;

  passwordMatcher = new ParentErrorStateMatcher('equalField');

  constructor() { }

  submitHandler(form: NgForm): void {
    if(!form.valid)
      return;
    /*this.http.post<any>(environment.apiUrl, form.value)
      .subscribe(() => {
        form.reset();
      });*/
    this.register.emit(form.form.value);
  }

  cF(input: NgModel) { return checkField(input); }

  GetPwType(): string { return this.showPassword ? 'text' : 'password'; }
}
