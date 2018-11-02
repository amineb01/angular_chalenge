
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router) { }

    canActivate() {
        let credential = JSON.parse(localStorage.getItem('user_credentials'))

        if (credential && credential.id) {
            console.log("credential",credential+"   "+credential.id)
            return true;
        }
        this.router.navigate(['']);
        return false;
    }



}