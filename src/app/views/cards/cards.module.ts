import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CardFormComponent } from './card-form.component';
import { FormsModule } from '@angular/forms';
import { CardListComponent } from './card-list.component';


@NgModule({
  declarations: [CardsComponent, CardFormComponent, CardListComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    FormsModule,
    MaterialSharedModule
  ]
})
export class CardsModule { }
