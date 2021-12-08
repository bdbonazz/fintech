import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';
import { TaxesRoutingModule } from './taxes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { ErarioComponent } from './erario.component';
import { InpsComponent } from './inps.component';
import { ContribuenteComponent } from './contribuente.component';



@NgModule({
  declarations: [
    TaxesComponent,
    ContribuenteComponent,
    ErarioComponent,
    InpsComponent,
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule
  ]
})
export class TaxesModule { }
