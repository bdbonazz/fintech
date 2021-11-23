import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxesComponent } from './taxes.component';
import { TaxesRoutingModule } from './taxes-routing.module';



@NgModule({
  declarations: [TaxesComponent],
  imports: [
    CommonModule,
    TaxesRoutingModule
  ]
})
export class TaxesModule { }
