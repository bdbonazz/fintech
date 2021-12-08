import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { back, forward, go } from './router.actions';
import { tap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable()
export class RouterEffects {

  constructor(
    private actions: Actions,
    private router: Router,
    private location: Location
  ) {}

  go$ = createEffect(() => this.actions.pipe(
    ofType(go),
    tap(({ path, extras }) => {
      this.router.navigate(path, extras);
    })
  ), { dispatch: false })

  back$ = createEffect(() => this.actions.pipe(
    ofType(back),
    tap(() => this.location.back())
  ), { dispatch: false })

  forward$ = createEffect(() => this.actions.pipe(
    ofType(forward),
    tap(() => this.location.forward())
  ), { dispatch: false })
}
