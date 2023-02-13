import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const AUTH_API = 'http://localhost:8080/api/badword';


@Injectable({
  providedIn: 'root'
})
export class BadwordService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

    //METHODE PERMETTANT D'AJOUTER UN Gros mot

    ajouterGrosMots(
      word: any,
    ): Observable<any> {
      const data = {
        word: word,
      };
  
      return this.http.post(`${AUTH_API}/ajouter`, data);
    }

    //METHODE PERMETTANT DE LISTER LES Gros mots
    listerGrosMots(): Observable<any> {
      return this.http.get(`${AUTH_API}/lire`);
    }

      //SUPRIMER Gros mots
  supprimerGrosMots(id: any): Observable<any> {
    return this.http.delete(
      `${AUTH_API}/supprimer/${id}`
    );
  }

}
