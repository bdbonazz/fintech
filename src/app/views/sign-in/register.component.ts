import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ParentErrorStateMatcher } from 'src/app/shared/errorStateMatcher/parentErrorStateMatcher';
import { checkField } from 'src/app/shared/utils/utils';

@Component({
  selector: 'ft-register',
  template: `
    <form #f="ngForm" (submit)="submitHandler(f)"
    ftEqualFieldValidator [Field1]="'password'" [Field2]="'password2'">
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Email</mat-label>
        <mat-icon matPrefix>perm_identity</mat-icon>
        <input type="text" required email [ngModel] name="email" placeholder="you@example.com" #email="ngModel"
        [ngClass]="cF(email)" matInput >
        <mat-error *ngIf="email.invalid && email.touched">
          Email richiesta
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Nome</mat-label>
        <mat-icon matPrefix>perm_identity</mat-icon>
        <input type="text" required [ngModel] name="name" placeholder="Mario" #name="ngModel"
        [ngClass]="cF(name)" matInput >
        <mat-error *ngIf="name.invalid && name.touched">
          Nome richiesto
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Cognome</mat-label>
        <mat-icon matPrefix>perm_identity</mat-icon>
        <input type="text" required [ngModel] name="surname" placeholder="Rossi" #surname="ngModel"
        [ngClass]="cF(surname)" matInput >
        <mat-error *ngIf="surname.invalid && surname.touched">
        Cognome richiesto
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input [type]="GetPwType()" required [ngModel] name="password" placeholder="Password" #password="ngModel"
        [ngClass]="cF(password)" matInput [errorStateMatcher]="passwordMatcher" >
        <mat-icon matSuffix class="pointer" (click)="showPassword = !showPassword">{{showPassword ? "visibility_off" : "visibility"}}</mat-icon>
        <mat-error *ngIf="password.invalid && password.touched">
        Password richiesta
        </mat-error>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" class="fullWidth">
        <mat-label>Ripeti la Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input [type]="GetPwType()" required [ngModel] name="password2" placeholder="Password" #password2="ngModel"
        [ngClass]="cF(password2)" matInput [errorStateMatcher]="passwordMatcher" >
        <mat-icon matSuffix class="pointer" (click)="showPassword = !showPassword">{{showPassword ? "visibility_off" : "visibility"}}</mat-icon>
        <mat-error *ngIf="password2.invalid && password2.touched">
        Password richiesta
        </mat-error>
      </mat-form-field>
      <span style="color: red" *ngIf="f.errors?.equalField">
          Password Don't Match.
      </span>
      <br>
      <button mat-raised-button color="primary" type="submit" class="btn btn-primary" style="width:100%" [disabled]="!f.valid">
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

  cF(input: NgModel){
    return checkField(input);
  }

  GetPwType(): string {
    return this.showPassword ? 'text' : 'password';
  }
}
