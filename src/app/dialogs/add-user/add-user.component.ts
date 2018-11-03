import { AccountService } from './../../shared/services/account.service';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpErrorResponse } from '@angular/common/http/src/response';
@Component({
  selector: 'app-add-use',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  $subs: Subscription;
  registerForm
  constructor(private acoountService: AccountService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log('data', data)
    this.initForm()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



  initForm() {
    this.registerForm = new FormGroup({
      email: new FormControl('test@gmail.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl("123456", [
        Validators.required,
        Validators.minLength(4),
      ])
      ,
      password_confirmation: new FormControl("123456", [
        Validators.required,
        Validators.minLength(4),
      ])
      ,
      username: new FormControl("test Username", [
        Validators.required,
        Validators.minLength(4),
      ])
    });
  }


  onSubmit() {
    if (this.registerForm.value.password === this.registerForm.value.password_confirmation ){
      
  let user= {email:this.registerForm.value.email,password:this.registerForm.value.password,username:this.registerForm.value.username}
    
   this.$subs = this.acoountService.createAcccount(user)
      .subscribe(
        res => {
          console.log("succes", res)
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          console.log("failfailfail", err)
          //this.requestError = err.message;
          // this.loading = false
        }, )
        
    }
   

  }
}
