import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppointmentsService } from 'src/app/api/appointments.service';
import { addAppointment, addAppointmentFail, addAppointmentSuccess, askAppointment, loadLocations, loadLocationsFail, loadLocationsSuccess, loadSlots, loadSlotsFail, loadSlotsSuccess, setClickedSlot, setLocationID } from './appointments.actions';
import { catchError, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewComponent } from 'src/app/shared/utils/dialog-overview.component';
import { americanToSmart } from 'src/app/shared/utils/utils';

@Injectable()
export class AppointmentsEffects {

  constructor(
    private actions: Actions,
    private appointmentService: AppointmentsService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) {}

  catchError$ = createEffect(() => this.actions.pipe(
    ofType(loadLocationsFail, loadSlotsFail, addAppointmentFail),
    tap(err => console.error(err))
  ), { dispatch: false })


  loadLocations$ = createEffect(() => this.actions.pipe(
    ofType(loadLocations),
    switchMap(() => this.appointmentService.getLocations().pipe(
      map(locations => loadLocationsSuccess({ locations })),
      catchError(err => of(loadLocationsFail({err})))
    ))
  ))

  setLocationID$ = createEffect(() => this.actions.pipe(
    ofType(setLocationID),
    filter(x => !!x.id),
    map(x => x.id),
    distinctUntilChanged(),
    map(id => loadSlots({ id }))
  ))


  loadSlots$ = createEffect(() => this.actions.pipe(
    ofType(loadSlots),
    switchMap(({ id }) => this.appointmentService.getSlots(id).pipe(
      map(daysWithSlots => loadSlotsSuccess({ daysWithSlots })),
      catchError(err => of(loadSlotsFail({ err })))
    ))
  ))


  askAppointment$ = createEffect(() => this.actions.pipe(
    ofType(askAppointment),
    filter(x => !!x.dayWithSlot && !!x.dayWithSlot.slot),
    switchMap(({ dayWithSlot }) =>
      this.dialog.open(DialogOverviewComponent, {
        width: '250px',
        data: {
          Title: `Confermi l'appuntamento`,
          Text: `L'appuntamento sarà fissato per il giorno ${americanToSmart(dayWithSlot.day)} alle ${dayWithSlot.slot.toString()}`
        },
      }).afterClosed().pipe(
        map(success => !!success ? addAppointment({ dayWithSlot }) : setClickedSlot(null)),
        catchError(() => of(setClickedSlot(null)))
      )
    ))
  )

  addAppointment$ = createEffect(() => this.actions.pipe(
    ofType(addAppointment),
    switchMap(({ dayWithSlot }) => this.appointmentService.addAppointment(dayWithSlot).pipe(
      map(res => res ? addAppointmentSuccess() : addAppointmentFail({err: "L'appuntamento non è stato aggiunto correttamente"})),
      catchError(err => of(addAppointmentFail({ err })))
    ))
  ))


  addAppointmentSuccess$ = createEffect(() => this.actions.pipe(
    ofType(addAppointmentSuccess),
    tap(_ => this.notificationService.show('Appuntamento Confermato'))
  ), { dispatch: false })


  addAppointmentFail$ = createEffect(() => this.actions.pipe(
    ofType(addAppointmentFail),
    tap(_ => this.notificationService.show("C'è stato un problema nel salvataggio dell'appuntamento", 'danger'))
  ), { dispatch: false })

}
