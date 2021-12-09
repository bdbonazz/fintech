import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardsComponent } from './cards.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { CardFormComponent } from './card-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardListComponent } from './card-list.component';
import { CardSelectComponent } from './card-select.component';
import { UtilsModule } from 'src/app/shared/utils/utils.module';
import { StoreModule } from '@ngrx/store';
import { CardReducer } from './store/cards.reducer';
import { CardsEffects } from './store/cards.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [CardsComponent, CardFormComponent, CardListComponent, CardSelectComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    UtilsModule,
    StoreModule.forFeature('cards', {
      cards: CardReducer,
    }),
    EffectsModule.forFeature([CardsEffects]),
  ],
  exports: [CardSelectComponent]
})
export class CardsModule { }
