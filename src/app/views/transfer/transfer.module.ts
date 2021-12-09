import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ValidatorsModule } from 'src/app/shared/validators/validators.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ContactReducer } from '../contact/store/contacts.reducer';
import { ContactsEffects } from '../contact/store/contacts.effects';


@NgModule({
  declarations: [TransferComponent],
  imports: [
    CommonModule,
    TransferRoutingModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    HttpClientModule,
    MatDialogModule,
    ValidatorsModule,
    StoreModule.forFeature('contacts', {
      contacts: ContactReducer,
    }),
    EffectsModule.forFeature([ContactsEffects]),
  ]
})
export class TransferModule { }
