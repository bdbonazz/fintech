import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';



@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'signin', component: SignInComponent },
      { path: 'register', component: RegisterComponent },
      { path: '', component:LoginComponent}
    ]),
    CommonModule,
    FormsModule,
    MaterialSharedModule,
    HttpClientModule,
    ValidatorsModule
  ]
})
export class SignInModule { }
