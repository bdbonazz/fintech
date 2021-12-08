import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogOverviewAttributes } from './models/dialogOverviewAttributes';

@Component({
  selector: 'ft-dialog-overview',
  template: `
    <div mat-dialog-content>
      <p>{{title}}</p>
    </div>
    <br>
    <div *ngIf="text">{{text}}</div>
    <br>
    <div mat-dialog-actions>
      <button mat-raised-button color="warn" class="btn btn-warn" [mat-dialog-close]="false">No</button>
      <button mat-raised-button color="primary" class="btn btn-primary" [mat-dialog-close]="true" cdkFocusInitial>Sì</button>
    </div>
  `,
  styles: [
  ]
})
export class DialogOverviewComponent{

  title: string = 'Sei Sicuro?'
  text: string | null = null
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOverviewAttributes) {
    if (data) {
      if (data.Title) {
        this.title = data.Title;
      }
      if(data.Text) {
        this.text = data.Text;
      }
    }
  }
}
