import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MovementComponent } from './movement.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from 'src/app/shared/utils/utils.module';
import { MovementReducer } from './store/movements.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MovementsEffects } from './store/movements.effects';
import { CardsEffects } from '../cards/store/cards.effects';
import { CardReducer } from '../cards/store/cards.reducer';


@NgModule({
  declarations: [MovementsComponent, MovementComponent],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MaterialSharedModule,
    HttpClientModule,
    FormsModule,
    UtilsModule,
    StoreModule.forFeature('movements', {
      movements: MovementReducer,
    }),
    EffectsModule.forFeature([MovementsEffects])
  ]
})
export class MovementsModule { }
