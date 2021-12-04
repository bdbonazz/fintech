import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';


@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    TransferRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    HttpClientModule,
    MatDialogModule,
    ValidatorsModule
  ]
})
export class TransferModule { }
