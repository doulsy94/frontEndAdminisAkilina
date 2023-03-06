import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/ministere';

@Injectable({
  providedIn: 'root',
})
export class MinistereService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //METHODE PERMETTANT DE LISTER UN MINISTERE
  listerMinistere(): Observable<any> {
    return this.http.get(`${AUTH_API}/lire`);
  }

  //METHODE PERMETTANT DE LISTER UN MINISTERE PAR ID
  lireMinistereById(id_ministere: any): Observable<any> {
    return this.http.get(`${AUTH_API}/lireParId/${id_ministere}`);
  }

  //METHODE PERMETTANT DE DONNER LE NOMBRE TOTAL DE MINISTERE
  nombreMinistere(): Observable<any> {
    return this.http.get(`${AUTH_API}/afficher_ministere_nombre`);
  }

  //METHODE PERMETTANT D'AFFICHER UN MINISTERE PAR LIBELLE
  lireMinistereParLibelle(libelle: any): Observable<any> {
    return this.http.get(`${AUTH_API}/lireParLibelle/${libelle}`);
  }

  //METHODE PERMETTANT D'AJOUTER UN MINISTERE
  ajouterMinistere(
    file: File,
    libelle: any,
    description: any
  ): Observable<any> {
    const data: FormData = new FormData();
    const ministere = [
      {
        libelle: libelle,
        description: description,
      },
    ];
    data.append('file', file);
    data.append(
      'ministere',
      JSON.stringify(ministere).slice(
        1,
        JSON.stringify(ministere).lastIndexOf(']')
      )
    );
    return this.http.post(`${AUTH_API}/ajouter`, data);
  }

  //METHODE PERMETTANT DE MODIFIER UN MINISTERE
  modifierMinistere(
    id_ministere: any,
    file: File,
    libelle: any,
    description: any
  ): Observable<any> {
    const data :FormData = new FormData();
    const ministere = [
      {
        "libelle": libelle,
        "description": description
      }
    ];

    data.append('file', file)

  console.log("libelle"+libelle)
  console.log("description"+description)
  data.append('ministere', JSON.stringify(ministere).slice(1,JSON.stringify(ministere).lastIndexOf(']')) ) 
   
    return this.http.put(`http://localhost:8080/api/ministere/modifier/${id_ministere}`, data
    );
  }

  //SUPRIMER MINISTERE
  supprimerMinistere(id_ministere: any, id_user: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/supprimer/${id_ministere}/${id_user}`);
  }
}
