import { Injectable } from '@angular/core';
import { Demande } from '../Model/Demande';
import { Http, Headers, Response } from "@angular/http";
import { Observable, Subject } from 'rxjs';


let url = 'http://localhost:3000/api/v1/demandes/'

@Injectable({
  providedIn: 'root'
})
export class DemandesService {

  demandeUSerSubject: Subject<Demande[]> = new Subject<Demande[]>();
  demandeUSer$;

  inprocessDemandeSubject: Subject<Demande[]> = new Subject<Demande[]>();
  inprocessDemande$;

  validDemandeSubject: Subject<Demande[]> = new Subject<Demande[]>();
  validDemande$;

  demandeUSer: Demande[] = [];
  inprocessDemande: Demande[] = [];
  validDemande: Demande[] = [];

  constructor(private http: Http, ) {
    this.demandeUSer$ = this.demandeUSerSubject.asObservable();
    this.inprocessDemande$ = this.inprocessDemandeSubject.asObservable();
    this.validDemande$ = this.validDemandeSubject.asObservable();

  }

  getinprocessDemandeForAdmin(page) {
    this.inprocessDemande = []
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);

    return this.http.get(url + 'admin/encours/' + page, { headers: headers })
      .map((response: Response) => {
        console.log("response", response)
        for (let demande of response.json().data) {
          console.log("test ", demande)
          this.inprocessDemande.push(new Demande(demande.id, demande.date_debut, demande.date_fin, demande.raison,
            demande.status, demande.created_at, demande.user_id, demande.username))
        }
        return this.inprocessDemande
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }



  getvalidDemandeForAdmin(page) {
    this.validDemande = [];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);
    return this.http.get(url + 'admin/valide/' + page, { headers: headers })
      .map((response: Response) => {
        for (let demande of response.json().data) {
          this.validDemande.push(new Demande(demande.id, demande.date_debut, demande.date_fin, demande.raison,
            demande.status, demande.created_at, demande.user_id, demande.username))
        }
        return this.validDemande
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }
  addTovalidDemandeForAdmin(newDemande) {
    this.validDemande.push(newDemande)
    this.validDemandeSubject.next(this.validDemande)
  }

  getDemandeForUser(page) {
    this.demandeUSer = [];
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);
    return this.http.get(url + 'user/' + page, { headers: headers })
      .map((response: Response) => {
        for (let demande of response.json().data) {
          this.demandeUSer.push(new Demande(demande.id, demande.date_debut, demande.date_fin, demande.raison,
            demande.status, demande.created_at, demande.user_id, demande.username))
        }
        return this.demandeUSer
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }

  addTodemandeUser(newDemande) {
    this.demandeUSer.push(newDemande)
    this.demandeUSerSubject.next(this.demandeUSer)
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
    const body = JSON.stringify({ date_debut: _dated, date_fin: _datef, raison: _raison });

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

