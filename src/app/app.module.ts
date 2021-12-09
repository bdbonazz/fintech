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
import { HttpClientXsrfModule } from '@angular/common/http';
import { InterceptorModule } from './core/interceptors/interceptor.module';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './store/router.effects';
import { CardReducer } from './views/cards/store/cards.reducer';
import { CardsEffects } from './views/cards/store/cards.effects';

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    InterceptorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialSharedModule,
    UtilsModule,
    MapsModule,
    DashboardModule,
    HomeModule,
    TaxesModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    StoreModule.forRoot({
      router: routerReducer,
      //cards: CardReducer,
    }),
    EffectsModule.forRoot([
      RouterEffects,
      //CardsEffects
    ]),
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
