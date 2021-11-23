import { Injectable } from '@angular/core';

export type avaibleStyle = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  message: string | null = null;
  style: avaibleStyle = 'success';

  show(message: string, style : avaibleStyle = 'success') {
    this.message = message;
    this.style = style;
    setTimeout(() => this.message = null, 25000);
  }

  hide() {
    this.message = null;
  }
}
