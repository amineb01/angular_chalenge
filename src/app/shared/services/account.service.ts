import { Injectable } from '@angular/core';
import { Demande } from '../Model/Demande';
import { Http, Headers, Response } from "@angular/http";
import { Observable, Subject } from 'rxjs';


let url = 'http://localhost:3000/api/v1/'
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  avatarSubject: Subject<any> = new Subject<any>();
  avatar$;

  constructor(private http: Http, ) {
    this.avatar$ = this.avatarSubject.asObservable();

  }



  uploadAvatar(image) {
    const headers = new Headers();
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);
    const formdata: FormData = new FormData();
    formdata.append("file", image);

    return this.http.put(url + 'upload/Avatar', formdata, { headers: headers }).
      map((response: Response) => { console.log('upload/Avatar', response); return response.json() })
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) })

  }


  getCredentials() {
    return JSON.parse(localStorage.getItem('user_credentials'))
  }

  saveAvatarPath(imagePath) {
    let imageFullPath = "http://localhost:3000" + imagePath
    localStorage.setItem('avatar', imageFullPath)
    this.avatarSubject.next(imageFullPath)
    return imageFullPath
  }
  getAvatarPath() {
    return localStorage.getItem('avatar');
  }
  //normalement on doit activer cette peration que pour un administrateur mais pour des raisons de test on va proceder comme suit
  createAcccount(user) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(user);

    //headers.append('X-User-Email', this.getCredentials().email); 
    //headers.append('X-User-Token', this.getCredentials().authentication_token);

    return this.http.post(url+"sign_up", body, { headers: headers })
      .map((response: Response) => {
        console.log("createDemande", response.json())
        return response.json().data
      }

      )
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
  }



}
