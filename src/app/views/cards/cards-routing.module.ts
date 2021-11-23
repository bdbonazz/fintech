import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardFormComponent } from './card-form.component';

import { CardsComponent } from './cards.component';

const routes: Routes = [
  { path: 'edit', component: CardFormComponent },
  { path: '', component: CardsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }
