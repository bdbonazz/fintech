import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { CardFormComponent } from './card-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from './card-list.component';


@NgModule({
  declarations: [CardsComponent, CardFormComponent, CardListComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule
  ]
})
export class CardsModule { }
