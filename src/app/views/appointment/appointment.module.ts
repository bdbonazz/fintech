import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { MapsModule } from 'src/app/shared/maps/maps.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppointmentReducer } from './store/appointments.reducer';
import { AppointmentsEffects } from './store/appointments.effects';
import { UtilsModule } from 'src/app/shared/utils/utils.module';


@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MaterialSharedModule,
    FormsModule,
    UtilsModule,
    MapsModule,
    StoreModule.forFeature('appointments', {
      appointments: AppointmentReducer,
    }),
    EffectsModule.forFeature([AppointmentsEffects]),
  ]
})
export class AppointmentModule { }
