import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/idee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class IdeeService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //METHODE PERMETTANT DE LISTER UN MINISTERE
  listerIdee(): Observable<any> {
    return this.http.get(`${AUTH_API}/lire`);
  }

  //METHODE PERMETTANT DE LISTER LES IDEES PAR MINISTERE
  lireIdeeParLibelleMinistere(libelle: any): Observable<any> {
    return this.http.get(
      `${AUTH_API}/afficherIdeeParLibelleMinistere/${libelle}`
    );
  }

  //METHODE PERMETTANT DE LISTER LES IDEES PAR ID DE MINISTERE
  lireIdeeParIdMinistere(id_ministere: any): Observable<any> {
    return this.http.get(
      `${AUTH_API}/afficherIdeeParIdMinistere/${id_ministere}`
    );
  }

  //METHODE PERMETTANT DE DONNER LE NOMBRE TOTAL D' IDEE
  nombreMinistere(): Observable<any> {
    return this.http.get(`${AUTH_API}/afficher_idee_nombre`);
  }

  //METHODE PERMETTANT D'AJOUTER UNE IDEE
  ajouterIdee(contenu: any, id_user: any, id_ministere: any): Observable<any> {
    const data = {
      contenu_idee: contenu,
    };
    return this.http.post(
      `${AUTH_API}/ajouter/${id_user}/${id_ministere}`,
      data
    );
  }

  //METHODE PERMETTANT DE LISTER UNE IDEE PAR ID
  lireIdeeById(id_idee: any): Observable<any> {
    return this.http.get(`${AUTH_API}/lireParId/${id_idee}`);
  }

  //METHODE PERMETTANT DE MODIFIER UNE IDEE
  modifierIdee(id_idee: any, id_user: any, contenu: any): Observable<any> {
    // const data: FormData = new FormData();
    var idee = [
      {
        contenu_idee: contenu,
      },
    ];
    var data = JSON.stringify(idee).slice(
      1,
      JSON.stringify(idee).lastIndexOf(']')
    );
    return this.http.post(
      `${AUTH_API}/modifier/${id_idee}/${id_user}`,
      data,
      this.httpOptions
    );
  }

  //SUPRIMER IDEE
  supprimerIdee(id_idee: any, id_user: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/supprimer/${id_idee}/${id_user}`);
  }

  //METHODE PERMETTANT D'AJOUTER DES JAIMES A UNE IDEE

  like(id_user: any, id_idee: any): Observable<any> {
    return this.http.post(`${AUTH_API}/like/${id_user}/${id_idee}`, {
      responseType: 'text',
    });
  }

  unlike(id_user: any, id_idee: any): Observable<any> {
    return this.http.post(`${AUTH_API}/unlike/${id_user}/${id_idee}`, {
      responseType: 'text',
    });
  }
}
