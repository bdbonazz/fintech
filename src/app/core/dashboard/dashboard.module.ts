import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { MaterialSharedModule } from 'src/app/shared/material/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    MaterialSharedModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          { path: 'home', loadChildren: () => import('../../views/home/home.module').then(m => m.HomeModule) },
          { path: 'cards', loadChildren: () => import('../../views/cards/cards.module').then(m => m.CardsModule) },
          { path: 'movements/:cardId', loadChildren: () => import('../../views/movements/movements.module').then(m => m.MovementsModule) },
          { path: 'movements', loadChildren: () => import('../../views/movements/movements.module').then(m => m.MovementsModule) },
          { path: 'transfer', loadChildren: () => import('../../views/transfer/transfer.module').then(m => m.TransferModule) },
          { path: 'contact', loadChildren: () => import('../../views/contact/contact.module').then(m => m.ContactModule) },
          { path: 'taxes', loadChildren: () => import('../../views/taxes/taxes.module').then(m => m.TaxesModule) },
          { path: 'appointment', loadChildren: () => import('../../views/appointment/appointment.module').then(m => m.AppointmentModule) },
          { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
