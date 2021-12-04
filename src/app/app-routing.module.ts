import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guards';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./views/sign-in/sign-in.module').then(m => m.SignInModule) },
  {
    path: 'dashboard',
    loadChildren: () => import('./core/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivateChild: [AuthGuard],
  },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
