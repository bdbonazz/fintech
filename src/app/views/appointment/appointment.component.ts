import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { filter, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectAppointmentState, selectDaysWithSlotsState, selectLoadingState, selectLocationsState, selectOpenedDrawerState, selectSelectedDateState, selectSelectedLocationIdState, selectSelectedLocationState, selectSelectedSlotState } from './store/appointments.selectors';
import { sameDateFromDMY } from 'src/app/shared/utils/utils';
import { askAppointment, loadLocations, setClickedSlot, setLocationID, setSelectedDate } from './store/appointments.actions';
import { Subscription } from 'rxjs';
import { slot } from 'src/app/models/location';

@Component({
  selector: 'ft-appointment',
  template: `
    <mat-drawer-container style="height: 100%; padding: 20px">
      <mat-list>
        <div mat-subheader>Carte</div>
        <mat-list-item *ngFor="let location of locations$ | async" (click)="LocationClick(location._id)" style="cursor: pointer">
          <mat-icon mat-list-icon>home</mat-icon>
          <div mat-line>{{location.name}}<br>{{location.address}}</div>
        </mat-list-item>
      </mat-list>
      <mat-drawer
      mode="side"
      position="end"
      style="padding: 20px"
      *ngIf="selectedLocation$ | async as selectedLocation"
      [opened]="openedDrawer$ | async"
      >
        <ft-maps  [coords]="selectedLocation.coords" [zoom]="3"></ft-maps>
        <mat-form-field appearance="fill">
          <mat-label>Scegli una data</mat-label>
          <input matInput [ngModel]="selectedDate$ | async" [matDatepickerFilter]="myFilter" [matDatepicker]="picker" readonly="true"
          (dateInput)="dateChange('input', $event)" (dateChange)="dateChange('change', $event)" >
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-divider></mat-divider>
        <mat-list *ngIf="selectedSlot$ | async as selectedSlot">
          <div mat-subheader>Orari disponibili</div>
          <div *ngIf="!selectedSlot.slots.length" class="alert alert-warning">Nessun Orario Disponibile</div>
          <mat-list-item *ngFor="let slot of selectedSlot.slots" (click)="SlotClick(slot)" style="cursor: pointer">
            <mat-icon mat-list-icon>watch_later</mat-icon>
            <div mat-line>{{slot}}</div>
          </mat-list-item>
        </mat-list>

      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [
  ]
})
export class AppointmentComponent implements OnInit, OnDestroy {

  loading$ = this.store.select(selectLoadingState);
  openedDrawer$ = this.store.select(selectOpenedDrawerState);

  locations$ = this.store.select(selectLocationsState);
  selectedLocationId$ = this.store.select(selectSelectedLocationIdState);
  selectedLocation$ = this.store.select(selectSelectedLocationState);
  /*
  //Test Funzionamento Chiusura per Giorni della Settimana
  closedDays: closedDays[] | null = [
    {
      locationId: '1',
      closedDays: [6, 0]
    },
    {
      locationId: '2',
      closedDays: [1, 2, 3]
    },
  ];*/
  daysWithSlots$ = this.store.select(selectDaysWithSlotsState);
  selectedDate$ = this.store.select(selectSelectedDateState);
  selectedSlot$ = this.store.select(selectSelectedSlotState);
  /*
  //Utils se servisse specificare per che location mi sto prenotando
  appointment: {
    Location: Location | null,
    slot: DayWithSlot | null
  } = {
    Location: null,
    slot: null
  };*/

  appointment$ = this.store.select(selectAppointmentState);

  sub = new Subscription();
  constructor(private store: Store) { }

  ngOnInit(): void {

    this.sub.add(this.appointment$.pipe(
    ).subscribe(dayWithSlot => this.store.dispatch(askAppointment({dayWithSlot}))));

    this.store.dispatch(loadLocations());
  }

ngOnDestroy(): void { this.sub.unsubscribe()}

  LocationClick(locationID: string): void { this.store.dispatch(setLocationID({ id: locationID})) }

  myFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    const today: number = new Date().getTime();

    const futureDays = today < date.getTime()
    let DayOk = true;
    /*
  //Test Funzionamento Chiusura per Giorni della Settimana
  if(this.closedDays)
    {
      const index = this.closedDays.findIndex(x => x.locationId === this.appointment.Location._id)
      if(index >= 0)
      {
        const cd: closedDays = this.closedDays[index];
        const day = date.getDay();
        DayOk = !cd.closedDays.includes(day);
      }
    }*/
    const valori: string[] = date.toLocaleDateString().split('/');
    const dayToday: number = +valori[0]
    const monthToday: number = +valori[1]
    const yearToday: number = +valori[2]

    this.daysWithSlots$.pipe(
      filter(x => x.length > 0),
      take(1)
      ).subscribe(res => {
        DayOk = res.findIndex(x => sameDateFromDMY(x.day, dayToday, monthToday, yearToday)) >= 0;
      });

    return futureDays && DayOk;
  };

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    //Mantengo un log nel caso in cui in futuro sia necessario modificare la business logic
    console.log(type);
    this.store.dispatch(setSelectedDate({date: event.value}));
  }

  SlotClick(slot: slot) { this.store.dispatch(setClickedSlot({ slot })) }
}
