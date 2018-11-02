import { Injectable } from '@angular/core';
import { Demande } from '../Model/Demande';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";


let url = 'http://192.168.1.18:3000/api/v1/demandes/'

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  constructor(private http: Http, ) { }

  getinprocessDemandeForAdmin(page) {
    console.log("getinprocessDemandeForAdmin")
    let demandes: Demande[] = [];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);

    return this.http.get(url + 'admin/encours/' + page, { headers: headers })
      .map((response: Response) => {
        console.log("response", response)
        for (let demande of response.json().data) {
          console.log("test ", demande)
          demandes.push(new Demande(demande.id, demande.date_debut, demande.date_fin, demande.raison,
            demande.status, demande.created_at, demande.user_id, demande.username))
        }
        return demandes
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }


  getvalidDemandeForAdmin(page) {
    let demandes: Demande[] = [];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);
    return this.http.get(url + 'admin/valide/' + page, { headers: headers })
      .map((response: Response) => {
        for (let demande of response.json().data) {
          demandes.push(new Demande(demande.id, demande.date_debut, demande.date_fin, demande.raison,
            demande.status, demande.created_at, demande.user_id, demande.username))
        }
        return demandes
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }


  getDemandeForUser(page) {
    let demandes: Demande[] = [];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);
    return this.http.get(url + 'user/' + page, { headers: headers })
      .map((response: Response) => {
        for (let demande of response.json().data) {
          demandes.push(new Demande(demande.id, demande.date_debut, demande.date_fin, demande.raison,
            demande.status, demande.created_at, demande.user_id, demande.username))
        }
        return demandes
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }


  getCredentials() {
    return JSON.parse(localStorage.getItem('user_credentials'))
  }

  setDemandeResponse(id, status) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ action: status });

    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);

    return this.http.put(url + id, body, { headers: headers })
      .map((response: Response) => {

        return response.json().data
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }


  createDemande(_dated, _datef, _raison) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify({ dated: _dated, datef: _datef, raison: _raison });

    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);

    return this.http.post(url, body, { headers: headers })
      .map((response: Response) => {
        console.log("createDemande", response.json())
        return response.json().data
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }

}

