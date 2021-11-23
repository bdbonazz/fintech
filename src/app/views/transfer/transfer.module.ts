import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    TransferRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    HttpClientModule,
    MatDialogModule
  ]
})
export class TransferModule { }
