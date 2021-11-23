import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortStringPipe } from './pipes/shortstring.pipe';
import { DialogOverviewComponent } from './dialog-overview.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterContactsPipe } from 'src/app/shared/utils/pipes/filter-contacts.pipe';



@NgModule({
  declarations: [ShortStringPipe, DialogOverviewComponent, FilterContactsPipe],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [ShortStringPipe, FilterContactsPipe]
})
export class UtilsModule { }
