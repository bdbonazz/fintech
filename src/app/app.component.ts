import { Component } from '@angular/core';

@Component({
  selector: 'ft-root',
  template: `
    <ft-notification></ft-notification>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'fintech';
}
