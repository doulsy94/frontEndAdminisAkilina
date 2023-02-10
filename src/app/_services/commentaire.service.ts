import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/commentaire';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //METHODE PERMETTANT DE LISTER UN MINISTERE
  listerCommentaire(): Observable<any> {
    return this.http.get(`${AUTH_API}/lire`);
  }

  //METHODE PERMETTANT DE LISTER LES IDEES PAR MINISTERE
  lireCommentaireParIdIdee(id_idee: any): Observable<any> {
    return this.http.get(`${AUTH_API}/afficherCommentaireParIdIdee/${id_idee}`);
  }

  //METHODE PERMETTANT DE DONNER LE NOMBRE TOTAL D' IDEE
  nombreCommentaire(): Observable<any> {
    return this.http.get(`${AUTH_API}/afficher_commentaire_nombre`);
  }

  //METHODE PERMETTANT D'AJOUTER UN COMMENTAIRE

  ajouterCommentaire(
    contenu: any,
    id_user: any,
    id_idee: any
  ): Observable<any> {
    const data = {
      contenu_commentaire: contenu,
    };

    return this.http.post(`${AUTH_API}/ajouter/${id_user}/${id_idee}`, data);
  }

  //METHODE PERMETTANT DE MODIFIER LE CONTENU D'UN COMMENTAIRE
  modifierCommentaire(
    id_commentaire: any,
    id_user: any,
    contenu: any
  ): Observable<any> {
    // const data: FormData = new FormData();
    var commentaire = [
      {
        contenu_commentaire: contenu,
      },
    ];
    // data.append('commentaire', JSON.stringify(commentaire).slice(1, JSON.stringify(commentaire).lastIndexOf(']')));
    var data = JSON.stringify(commentaire).slice(
      1,
      JSON.stringify(commentaire).lastIndexOf(']')
    );
    return this.http.post(
      `${AUTH_API}/modifier/${id_commentaire}/${id_user}`,
      data,
      this.httpOptions
    );
  }

  //SUPRIMER COMMENTAIRE
  supprimerCommentaire(id_commentaire: any, id_user: any): Observable<any> {
    return this.http.delete(
      `${AUTH_API}/supprimer/${id_commentaire}/${id_user}`
    );
  }

  //METHODE PERMETTANT DE LISTER UN COMMENTAIRE PAR ID
  lireCommentaireById(id_commentaire: any): Observable<any> {
    return this.http.get(`${AUTH_API}/lireParId/${id_commentaire}`);
  }
}
