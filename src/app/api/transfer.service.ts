import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transfer } from '../models/transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) {}

  addTransfer(transfer: Transfer): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/transfer', transfer);
  }
}
