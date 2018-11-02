import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthentificationService } from '../shared/services/authentification.service';
import * as crypto from "crypto-js";
import { AccountService } from '../shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  $subs: Subscription;
  loading: boolean = false
  requestError


  constructor(private router: Router, private authentificationService: AuthentificationService,private accountService: AccountService ) { }

  ngOnInit() {
    this.initForm();
    this.authentificationService.isUserLogged()
  }

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ])

    });
  }

  onSubmit() {

    this.loading = true
    setTimeout(() => { this.loading = false }, 2000)


    this.$subs = this.authentificationService.signin(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
      res => {
        this.loading = false;
        //   this.open.emit(false);

        console.log("result", res)
        if (res.status === "fail") {
          this.requestError = res.data;

        } else {
          console.log("resresres",res)
          if(res.avatar.url)
          this.accountService.saveAvatarPath(res.avatar.url.replace(/^.*[\\\/]/, ''))
           this.authentificationService.setUserCredentials(JSON.stringify(res))

        }
      },
      (err: HttpErrorResponse) => {

        this.requestError = err.message;
        this.loading = false
      }, )

  }
  ngOnDestroy() { if (this.$subs) this.$subs.unsubscribe() }

}
