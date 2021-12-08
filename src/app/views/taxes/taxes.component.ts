import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaxesService } from 'src/app/api/taxes.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Card } from 'src/app/models/card';
import { Totali } from 'src/app/models/tax';
import { ToNumber } from 'src/app/shared/utils/utils';
import { CardSelectComponent } from '../cards/card-select.component';

@Component({
  selector: 'ft-taxes',
  template: `
    <form [formGroup]="form" (submit)="submitHandler()" >
      <ft-contribuente formControlName="contribuente"></ft-contribuente>
      <br>
      <br>

      <h2>Erario</h2>
      <ng-container formArrayName="erario">
        <ft-erario *ngFor="let erarioRow of erario.controls; let i = index" [formControlName]="i" [index]="i" (remove)="remove(erario, $event)" ></ft-erario>
      </ng-container>
      <ng-container *ngIf="erario.controls.length">
        <div class="row" *ngIf="totaliErario$ | async as totaliErario">
          <div class="col-3">
            <h2>Totale a debito: € {{totaliErario.totaleDebito}}</h2>
          </div>
          <div class="col-3">
            <h2>Totale a credito: € {{totaliErario.totaleCredito}}</h2>
          </div>
        </div>
      </ng-container>
      <mat-icon matListIcon style="font-size: 50px;" (click)="addErario()" class="pointer">add_circle</mat-icon>

      <br>
      <br>
      <mat-divider></mat-divider>

      <h2>Inps</h2>
      <ng-container formArrayName="inps">
        <ft-inps *ngFor="let inpsRow of inps.controls; let i = index" [formControlName]="i" [index]="i" (remove)="remove(inps, $event)" ></ft-inps>
      </ng-container>
      <ng-container *ngIf="inps.controls.length">
        <div class="row" *ngIf="totaliInps$ | async as totaliInps">
          <div class="col-3">
            <h2>Totale a debito: € {{totaliInps.totaleDebito}}</h2>
          </div>
          <div class="col-3">
            <h2>Totale a credito: € {{totaliInps.totaleCredito}}</h2>
          </div>
        </div>
      </ng-container>
      <mat-icon matListIcon style="font-size: 50px;" (click)="addInps()" class="pointer">add_circle</mat-icon>

      <br>
      <h2>Saldo totale: € {{totale$ | async}}</h2>
      <br>
      <br>
      <button mat-raised-button color="primary" type="submit" class="btn btn-primary" style="width:100%" [disabled]="!(valid$ | async)">
        Conferma
      </button>
    </form>
  `,
  styles: [
  ]
})
export class TaxesComponent implements OnInit {

  valid$ = new BehaviorSubject<boolean>(false);
  totaliErario$ = new BehaviorSubject<Totali>({ totaleDebito: 0, totaleCredito: 0});
  totaliInps$ = new BehaviorSubject<Totali>({ totaleDebito: 0, totaleCredito: 0});

  totale$ = combineLatest([this.totaliErario$, this.totaliInps$]).pipe(
    map(([totaliErario, totaliInps]) => {
      return totaliErario.totaleCredito - totaliErario.totaleDebito + totaliInps.totaleCredito - totaliInps.totaleDebito
    })
  );

  sub = new Subscription();
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private taxesService: TaxesService,
    public notificationService: NotificationService
    ) { }

    ngOnInit() {
      this.sub.add(this.erario.valueChanges.subscribe(res => {
        this.totaliErario$.next(this.valorizzaTotali(res))
      }));
      this.sub.add(this.inps.valueChanges.subscribe(res => {
        this.totaliInps$.next(this.valorizzaTotali(res))
      }));
      this.sub.add(this.form.valueChanges.subscribe(_ => {
        const formValid = this.form.valid ;
        let contribuenteValid = false;
        const contribuente = this.form.get('contribuente');
        if(contribuente) {
          if(contribuente.value) {
            contribuenteValid = contribuente.value.valid;
          }
        }

        let ErarioValid = true;
        for(let i = 0; i < this.erario.value.length; i++) {
          if (this.erario.value[i]) {
            if (!this.erario.value[i].valid) {
              ErarioValid = false;
              break;
            }
          }
          else {
            ErarioValid = false;
            break;
          }
        }
        let InpsValid = true;
        for(let i = 0; i < this.inps.value.length; i++) {
          if (this.inps.value[i]) {
            if(!this.inps.value[i].valid) {
              InpsValid = false;
              break;
            }
          }
          else {
            InpsValid = false;
            break;
          }
        }
        this.valid$.next(formValid && contribuenteValid && ErarioValid && InpsValid)
      }));

    }

    valorizzaTotali (res: any) : Totali
    {
      let totaleRes: Totali = { totaleDebito: 0, totaleCredito: 0};
      if(res) {
        res.forEach(x => {
          totaleRes.totaleDebito = totaleRes.totaleDebito + +ToNumber(x.debito);
          totaleRes.totaleCredito =  totaleRes.totaleCredito + +ToNumber(x.credito);
        });
      }
      return totaleRes;
    }

  form = this.fb.group({
    contribuente: this.fb.control(''),
    erario: this.fb.array([]),
    inps: this.fb.array([]),
  });

  get erario() { return this.form.get('erario') as FormArray; }

  addErario() { this.erario.push(this.fb.control('')); }


  get inps() { return this.form.get('inps') as FormArray; }

  addInps() { this.inps.push(this.fb.control('')); }


  remove(array: FormArray, index: number) { array.removeAt(index); }

  clear(array: FormArray) { array.clear(); }

  submitHandler(){
    if(!this.valid$.getValue()) {
      return;
    }

    const dialogRef = this.dialog.open(CardSelectComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result: Card) => {
      if(result)
      {
        const obj = {
          contribuente: this.form.get('contribuente').value,
          erario: this.erario.value,
          inps: this.inps.value,
          card: result
        };
        this.taxesService.addTax(obj).subscribe({
          next: res => {
            if(res) {
              this.notificationService.show('La procedura è stata completata con Successo')
              this.erario.clear();
              this.inps.clear();
              this.form.reset();
            }
            else {
              this.notificationService.show('È avvenuto un errore', 'danger')
            }
          },
          error: err => console.error(err)
        });
      }
    });
  }
}
