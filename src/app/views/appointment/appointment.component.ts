import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDrawer } from '@angular/material/sidenav';
import { avaibleStyle, NotificationService } from 'src/app/core/services/notification.service';
import { DayWithSlot, DayWithSlots, Location, slot } from 'src/app/models/location';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from 'src/app/shared/utils/dialog-overview.component';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
      <mat-drawer #drawer mode="side" position="end" style="padding: 20px" *ngIf="selectedLocation$ | async as selectedLocation">
        <ft-maps  [coords]="selectedLocation.coords" [zoom]="3"></ft-maps>
        <mat-form-field appearance="fill">
          <mat-label>Scegli una data</mat-label>
          <input matInput [matDatepickerFilter]="myFilter" [matDatepicker]="picker" readonly="true"
          (dateInput)="dateChange('input', $event)" (dateChange)="dateChange('change', $event)" >
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
        </mat-form-field>
        <mat-divider></mat-divider>
        <mat-list *ngIf="selectedSlot">
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
export class AppointmentComponent implements OnDestroy{
  sub = new Subscription();

  @ViewChild('drawer', { read: MatDrawer }) drawerRef!: MatDrawer;

  locations$ = new BehaviorSubject<Location[]>([]);
  selectedLocationId$ = new BehaviorSubject<string>('');

  selectedLocation$ = combineLatest([this.locations$, this.selectedLocationId$]).pipe(
    map(([locations, selectedLocationId]) => {
      const index = locations.findIndex(x => x._id === selectedLocationId);
      return index >= 0 ? locations[index] : null;
    })
  );

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
  daysWithSlots$ = new BehaviorSubject<DayWithSlots[]>([]);
  selectedSlot: DayWithSlots | null;

  /*
  //Utils se servisse specificare per che location mi sto prenotando
  appointment: {
    Location: Location | null,
    slot: DayWithSlot | null
  } = {
    Location: null,
    slot: null
  };*/

  constructor(public notificationService: NotificationService, public dialog: MatDialog, private appointmentService: AppointmentsService) {
    appointmentService.getLocations().subscribe({
      next: res => this.locations$.next(res),
      error: err => console.error(err)
    });

    this.sub.add(this.selectedLocation$.pipe(
      switchMap(res => this.appointmentService.getSlots(res._id))
    ).subscribe({
      next: res => {
        if(!this.drawerRef.opened){
          this.drawerRef.toggle();
        }

        this.daysWithSlots$.next(res);
      },
      error: err => console.error(err)
    }))
   }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  LocationClick(locationID: string): void {
    this.selectedLocationId$.next(locationID);
  }

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

    const daysWithSlots = this.daysWithSlots$.getValue();
    if(daysWithSlots.length)
      DayOk = daysWithSlots.findIndex(x => this.sameDateFromDMY(x.day, dayToday, monthToday, yearToday)) >= 0;

    return futureDays && DayOk;
  };

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(type);
    this.selectedSlot = this.daysWithSlots$.getValue().find(x => this.sameDateFromDate(x.day, event.value));
  }

  SlotClick(slot: slot)
  {
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {
        Title: `Confermi l'appuntamento`,
        Text: `L'appuntamento sarà fissato per il giorno ${this.americanToSmart(this.selectedSlot.day)} alle ${slot.toString()}`
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        const newAppointment: DayWithSlot = {
          day: this.selectedSlot.day,
          slot: slot
        }
        this.appointmentService.addAppointment(newAppointment).subscribe(
          res => {
            if(res)
            {
              this.openSnackBar("Appuntamento Confermato")
              this.drawerRef.toggle();
            }
            else{
              console.log(res);
              this.openSnackBar("C'è stato un problema nel salvataggio dell'appuntamento'", 'danger');
            }
          },
          err => {
            console.error(err);
            this.openSnackBar("C'è stato un problema nel salvataggio dell'appuntamento'", 'danger');
          },
          () => {}
        )
      }
    });
  }

  openSnackBar(message: string, style: avaibleStyle = 'success') {
    this.notificationService.show(message, style)
  }


  americanToSmart(date: string) : string {
    const valori: string[] = date.split('/');
    return [
      String(valori[1]).padStart(2, '0'),
      String(valori[0]).padStart(2, '0'),
      String(valori[2]).padStart(4, '0')
    ].join("/");
      ;
  }

  sameDateFromDate(slotDate: string, date: Date) : boolean {
    //Dato che la data è scritta secondo lo stile americano, confronto singolarmente giorno, mese e anno
    if (!date) {
      return false;
    }

    const valori: string[] = date.toLocaleDateString().split('/');
    const dayToday: number = +valori[0]
    const monthToday: number = +valori[1]
    const yearToday: number = +valori[2]
    return this.sameDateFromDMY(slotDate, dayToday, monthToday, yearToday);
  }

  sameDateFromDMY(slotDate: string, day: number, month: number, year: number) : boolean {
    //Dato che la data è scritta secondo lo stile americano, confronto singolarmente giorno, mese e anno
    if (!slotDate) {
      return false;
    }
    const valori: string[] = slotDate.split('/');
    if (valori.length < 3){
      return false;
    }

    return day === +valori[1] && month === +valori[0] && year === +valori[2];
  }
}
