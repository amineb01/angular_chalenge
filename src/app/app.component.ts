import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthentificationService } from './shared/services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'chalenge';
  constructor(private router: Router, private authentificationService: AuthentificationService) {
    this.authentificationService.isUserLogged();

    this.authentificationService.Credentials$.subscribe(res => {
      let credential = JSON.parse(res)

      if (credential) {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/login']);
      }
    })

  }


  logout() {
    //this.authentificationService.logout()
  }

}
