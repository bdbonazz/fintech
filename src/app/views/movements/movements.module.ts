import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { MovementComponent } from './movement.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UtilsModule } from 'src/app/shared/utils/utils.module';


@NgModule({
  declarations: [MovementsComponent, MovementComponent],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    MaterialSharedModule,
    HttpClientModule,
    FormsModule,
    UtilsModule
  ]
})
export class MovementsModule { }
