import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ft-movement',
  template: `
    <!--<mat-expansion-panel hideToggle *ngIf="movement">
      <mat-expansion-panel-header>
        <mat-panel-title>
          <span style="font-style: italic;">{{movement.timestamp | date}}</span>
          <span [style.color]="movement.type === 'out' ? 'red' : 'green'">{{movement.amount | currency}}</span>
          <span style="font-weight: bold;">{{movement.title}}</span>
        </mat-panel-title>
        <mat-panel-description>
          {{getShortDescription(movement.description)}}
        </mat-panel-description>
      </mat-expansion-panel-header>
      <p>{{movement.description}}</p>
    </mat-expansion-panel>-->
    <mat-expansion-panel hideToggle>
      <mat-expansion-panel-header>
        <mat-panel-title>
          <span style="font-style: italic;">{{date}}</span>
          <span style="padding-left: 15px;" [style.color]="type === 'out' ? 'red' : 'green'">{{amount}}</span>
          <div style="font-weight: bold; text-align: center; width: 400px;">{{title}}</div>
        </mat-panel-title>
        <mat-panel-description>
          <div style="text-align: center;">{{description | shortstring }}</div>
        </mat-panel-description>
      </mat-expansion-panel-header>
      <p>{{description}}</p>
    </mat-expansion-panel>
  `,
  styles: [
  ]
})
export class MovementComponent implements OnInit {
  //@Input() movement: Movement | null = null
  @Input() date: string | null = null
  @Input() type: 'in' | 'out' = 'in'
  @Input() amount: string | null = null
  @Input() title: string | null = null
  @Input() description: string | null = null
  descLen = 15;
  constructor() { }

  ngOnInit(): void {
  }
}
