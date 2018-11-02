

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthAdminGuard implements CanActivate {

    constructor(
        private router: Router) { }

    canActivate() {
        let credential = JSON.parse(localStorage.getItem('user_credentials'))

        if (credential && credential.id && credential.isAdmin ) {
            console.log("credential.id ",credential.id )

            console.log("credential.isAdmin ",credential.isAdmin )
          
            return true;
        }
        this.router.navigate(['']);
        return false;
    }



}