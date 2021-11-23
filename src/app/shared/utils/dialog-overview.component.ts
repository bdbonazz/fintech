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
      <button mat-button [mat-dialog-close]="false">No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Sì</button>
    </div>
  `,
  styles: [
  ]
})
export class DialogOverviewComponent{

  title: string = 'Sei Sicuro?'
  text: string | null = null
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogOverviewAttributes) {
    if(data.Title)
      this.title = data.Title;
      if(data.Text)
        this.text = data.Text;
  }
}
