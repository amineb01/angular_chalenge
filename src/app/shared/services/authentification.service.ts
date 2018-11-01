
import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable, Subject, throwError } from 'rxjs';
import 'rxjs/add/operator/map';


let url = 'http://192.168.1.18:3000/api/'
let token: string

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  Credentials$: Observable<string>;

  tokenSubject: Subject<any> = new Subject<any>();

  constructor(private http: Http) {
    this.Credentials$ = this.tokenSubject.asObservable();

  }



  signin(_email, _password) {
    const body = JSON.stringify({ email: _email, password: _password });
    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(url + 'v1/sign_in', body, { headers: headers })
      .map((response: Response) => { console.log(response.json()); return response.json() })
      .catch((error) => { console.log("some error", error); return Observable.throw(error.json()) });
  }


  setUserCredentials(credentials: string): void {
    localStorage.setItem('user_credentials', credentials);
    this.tokenSubject.next(credentials);
  }

  isUserLogged() {
    let credentials = localStorage.getItem('user_credentials');
    this.tokenSubject.next(credentials);

  }
  /*
    signup(user) {
  
      const body = JSON.stringify(user);
  
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(url + 'accounts/register', body, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
    }
  
    signinFb(fbToken) {
      const body = JSON.stringify({ access_token: fbToken });
      const headers = new Headers({ 'Content-Type': 'application/json' });
      return this.http.post(url + 'auth/facebook', body, { headers: headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) });
    }
  
  
    isLoggedIn() {
      return localStorage.getItem('token') !== null;
    }
  */
}
