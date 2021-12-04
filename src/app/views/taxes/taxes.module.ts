import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';
import { TaxesRoutingModule } from './taxes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { ErarioComponent } from './erario.component';



@NgModule({
  declarations: [
    TaxesComponent,
    ErarioComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule
  ]
})
export class TaxesModule { }
