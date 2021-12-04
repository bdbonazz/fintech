import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { UtilsModule } from 'src/app/shared/utils/utils.module';
import { ContactListComponent } from './contact-list.component';
import { ContactFormComponent } from './contact-form.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [ContactComponent, ContactListComponent, ContactFormComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialSharedModule,
    MatDialogModule,
    UtilsModule
  ]
})
export class ContactModule { }
