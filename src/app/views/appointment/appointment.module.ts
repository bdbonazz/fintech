import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './appointment.component';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { MapsModule } from 'src/app/shared/maps/maps.module';


@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    AppointmentRoutingModule,
    MaterialSharedModule,
    MapsModule
  ]
})
export class AppointmentModule { }
