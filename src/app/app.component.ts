import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthentificationService } from './shared/services/authentification.service';
import { AccountService } from './shared/services/account.service';
import { MatDialog } from '@angular/material';
import { AddDemandeDialogComponent } from './dialogs/add-demande-dialog/add-demande-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'chalenge';
  isAdmin = false;
  hideProfile = false;
  selectedFile
  imageTodisplay;
  emailUser
  credentials = JSON.parse(localStorage.getItem('user_credentials'));

  demandeForm
  constructor(public dialog: MatDialog, private router: Router, 
    private authentificationService: AuthentificationService, 
    private accountService: AccountService) {


  }


  ngOnInit() {
    this.accountService.avatar$
    .subscribe(res=>{this.imageTodisplay=res})
   
    if (this.credentials)
      this.emailUser =this.credentials.email;

    let imagePath = this.accountService.getAvatarPath()
    if (imagePath)
      this.imageTodisplay = imagePath

    this.authentificationService.Credentials$.subscribe(res => {
      let credential = JSON.parse(res)
      if (credential && credential.id && !credential.isAdmin) {

        this.router.navigate(['/user']);
      }
      else if (credential && credential.id && credential.isAdmin) {
        this.router.navigate(['/admin']);
      }
      else {
        this.router.navigate(['/login']);
      }
    })


    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (event.url === "/admin") {
          this.isAdmin = true;
          this.updateProfile();
        }
        else if (event.url === "/user") {
          this.isAdmin = false;
          this.updateProfile();
        } else {
          this.hideProfile = true;
        }
      }
    });
  }

  updateProfile() {
    this.emailUser = JSON.parse(localStorage.getItem('user_credentials')).email;
    this.hideProfile = false;
  }
  logout() {
    this.authentificationService.logout()
  }

  onFileChanged(event) {

    this.selectedFile = event.target.files[0]
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.accountService.uploadAvatar(this.selectedFile)
      .subscribe(res => this.saveUrlImagePath(res.data.url))
    }

  }

  saveUrlImagePath(imagePath) {
    this.imageTodisplay = this.accountService.saveAvatarPath(imagePath)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDemandeDialogComponent, {
      data: { form: this.demandeForm }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

    });
  }


}
