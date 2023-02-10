import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //METHODE PERMETTANT DE LISTER  NOTIFICATION
  listerNotification(): Observable<any> {
    return this.http.get(`${AUTH_API}/afficher`);
  }

  //SUPRIMER NOTIFICATION
  supprimerNotification(id_notification: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/supprimer/${id_notification}`);
  }

  //METHODE PERMETTANT DE LISTER UNE NOTIFICATION PAR ID
  lireNotificationById(id_notification: any): Observable<any> {
    return this.http.get(`${AUTH_API}/lireParId/${id_notification}`);
  }
}
