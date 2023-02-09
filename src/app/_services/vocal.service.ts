import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/vocal';

@Injectable({
  providedIn: 'root',
})
export class VocalService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //METHODE PERMETTANT D'AJOUTER UN VOCAL
  ajouterVocal(id_user: any, id_ministere: any, file:any): Observable<any> {
    const data: FormData = new FormData();
    /*  const fichierVocal = [{
      "fileName": fileName,
      "duration": duration
    }]*/
    data.append('file', file);
    // data.append('fichierVocal', JSON.stringify(fichierVocal).slice(1, JSON.stringify(fichierVocal).lastIndexOf(']')));
    return this.http.post(
      `${AUTH_API}/ajouter/${id_user}/${id_ministere}`,
      data
    );
  }

  //METHODE PERMETTANT DE LISTER VOCAL
  listerVocal(): Observable<any> {
    return this.http.get(`${AUTH_API}/lire`);
  }

  //METHODE PERMETTANT DE LISTER LES VOCAUX PAR MINISTERE
  lireVocalParLibelleMinistere(libelle: any): Observable<any> {
    return this.http.get(
      `${AUTH_API}/afficherVocalParLibelleMinistere/${libelle}`
    );
  }

  //METHODE PERMETTANT DE LISTER LES VOCAUX PAR ID DE MINISTERE
  lireVocalParIdMinistere(id_ministere: any): Observable<any> {
    return this.http.get(
      `${AUTH_API}/afficherVocalParIdMinistere/${id_ministere}`
    );
  }

  //SUPRIMER Vocal
  supprimerVocal(id: any, id_user: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/supprimer/${id}/${id_user}`);
  }
}
