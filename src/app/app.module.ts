import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialSharedModule } from './shared/material/material.module';
import { UtilsModule } from './shared/utils/utils.module';
import { NotificationComponent } from './core/components/notification.component';
import { MapsModule } from './shared/maps/maps.module';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { HomeModule } from './views/home/home.module';
import { TaxesModule } from './views/taxes/taxes.module';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    UtilsModule,
    MapsModule,
    DashboardModule,
    HomeModule,
    TaxesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
