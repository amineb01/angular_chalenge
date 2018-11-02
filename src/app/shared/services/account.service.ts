import { Injectable } from '@angular/core';
import { Demande } from '../Model/Demande';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";


let url = 'http://192.168.1.18:3000/api/v1/'
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: Http, ) { }



  uploadAvatar(image) {
    const headers = new Headers();
    headers.append('X-User-Email', this.getCredentials().email);
    headers.append('X-User-Token', this.getCredentials().authentication_token);
    const formdata: FormData = new FormData();
    formdata.append("file", image);

    return this.http.put(url + 'upload/Avatar', formdata, { headers: headers }).
      map((response: Response) => { console.log(response); return response.json() })
      .catch((error: Response) => { console.log(error); return Observable.throw(error.json()) })

  }


  getCredentials() {
    return JSON.parse(localStorage.getItem('user_credentials'))
  }

  saveAvatarPath(imageName){
    let imagePath="http://192.168.1.18:3000/uploads/user/avatar/2/"+imageName
    localStorage.setItem('avatar',imagePath)

    return imagePath
  }
  getAvatarPath(){
    return localStorage.getItem('avatar');
  }

}
