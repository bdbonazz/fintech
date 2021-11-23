import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card, CardForm } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) {}

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(environment.apiUrl + '/cards');
  }

  getMovements(cardId: string, limit: number, offset: number): Observable<Card[]> {
    let params: string = '';
    if(limit || offset)
    {
      params += "?";
      if(limit) {
        params += "limit=" + limit;
      }
      if(limit && offset){
        params += "&";
      }
      if(offset){
        params += "offset=" + offset;
      }
    }
    return this.http.get<Card[]>(environment.apiUrl + '/cards/' + cardId + "/movements" + params);
  }

  addCard(card: CardForm): Observable<Card> {
    return this.http.post<Card>(environment.apiUrl + '/cards', card);
  }

  deleteCard(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/cards/' + _id);
  }
}
