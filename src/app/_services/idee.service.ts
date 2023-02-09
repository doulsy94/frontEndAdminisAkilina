import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/idee';
@Injectable({
  providedIn: 'root'
})
export class IdeeService {

constructor(private http: HttpClient) { }

//METHODE PERMETTANT DE LISTER UN MINISTERE
listerIdee(): Observable<any>{
  return this.http.get(`${AUTH_API}/lire`);
}

//METHODE PERMETTANT DE LISTER LES IDEES PAR MINISTERE
lireIdeeParLibelleMinistere(libelle:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherIdeeParLibelleMinistere/${libelle}`);
}

//METHODE PERMETTANT DE LISTER LES IDEES PAR ID DE MINISTERE
lireIdeeParIdMinistere(id_ministere:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherIdeeParIdMinistere/${id_ministere}`);
}

//METHODE PERMETTANT DE DONNER LE NOMBRE TOTAL D' IDEE
nombreMinistere(): Observable<any> {

  return this.http.get(`${AUTH_API}/afficher_idee_nombre`);
}

//METHODE PERMETTANT D'AJOUTER UNE IDEE
ajouterIdee(contexte: any, contenu: any, id_user: any, id_ministere: any): Observable<any> {

  const data: FormData = new FormData();
  const idee = [{
    "contexte": contexte,
    "contenu": contenu
  }]
  data.append('idee', JSON.stringify(idee).slice(1, JSON.stringify(idee).lastIndexOf(']')));
  return this.http.post(`${AUTH_API}/ajouter/${id_user}/${id_ministere}`, data);
}

//METHODE PERMETTANT DE MODIFIER UNE IDEE
modifierIdee(id_idee: any, id_user: any, contexte: any, contenu: any): Observable<any> {

  const data: FormData = new FormData();
  const idee = [{
    "contexte": contexte,
    "contenu": contenu,
  }]
  data.append('idee', JSON.stringify(idee).slice(1, JSON.stringify(idee).lastIndexOf(']')));
  return this.http.put(`${AUTH_API}/modifier/${id_idee}/${id_user}`, data);
}

 //SUPRIMER IDEE
 suprimerIdee(id_idee:any, id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API}/supprimer/${id_idee}/${id_user}`);
}

//METHODE PERMETTANT D'AJOUTER DES JAIMES A UNE IDEE
ajouterJaime(id_idee:any, id_user:any):Observable<any>{
  const data: FormData = new FormData();
  const jaime = [{
    "id_idee": id_idee,
    "id_user": id_user
  }]
  data.append('jaime', JSON.stringify(jaime).slice(1, JSON.stringify(jaime).lastIndexOf(']')));
  return this.http.post(`${AUTH_API}/ajouter/${id_user}/${id_idee}`, data);
}

 //METHODE PERMETTANT DE LISTER LES JAIMES D'UNE IDEE
 lireJaime(): Observable<any>{
  return this.http.get(`${AUTH_API}/lire`);
}

//SUPRIMER JAIMES
suprimerJaime(id:any, id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API}/supprimer/${id}/${id_user}`);
}

//METHODE PERMETTANT D'AFFICHER LES JAIMES PAR ID IDEES 
lireJaimeParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherJaimeParIdIdee/${id_idee}`);
}

//METHODE PERMETTANT D'AFFICHER LE NOMBRE DE JAIMES PAR ID IDEES 
nbreJaimeParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherNombreJaimeParIdIdee/${id_idee}`);
}


//METHODE PERMETTANT D'AJOUTER DES JAIMES PAS A UNE IDEE
ajouterJaimePas(id_idee:any, id_user:any):Observable<any>{
  const data: FormData = new FormData();
  const jaimePas = [{
    "id_idee": id_idee,
    "id_user": id_user
  }]
  data.append('jaimePas', JSON.stringify(jaimePas).slice(1, JSON.stringify(jaimePas).lastIndexOf(']')));
  return this.http.post(`${AUTH_API}/ajouter/${id_user}/${id_idee}`, data);
}

 //METHODE PERMETTANT DE LISTER LES JAIMES D'UNE IDEE
 lireJaimePas(): Observable<any>{
  return this.http.get(`${AUTH_API}/lire`);
}

//SUPRIMER JAIMES
suprimerJaimePas(id:any, id_user:any):Observable<any>{
  return this.http.delete(`${AUTH_API}/supprimer/${id}/${id_user}`);
}

//METHODE PERMETTANT D'AFFICHER LES JAIMES PAR ID IDEES 
lireJaimePasParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherJaimePasParIdIdee/${id_idee}`);
}

//METHODE PERMETTANT D'AFFICHER LE NOMBRE DE JAIMES PAR ID IDEES 
nbreJaimePasParIdIdee(id_idee:any): Observable<any>{
  return this.http.get(`${AUTH_API}/afficherNombreJaimePasParIdIdee/${id_idee}`);
}

}

