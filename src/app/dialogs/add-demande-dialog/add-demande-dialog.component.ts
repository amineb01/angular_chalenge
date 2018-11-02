import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { DemandesService } from '../../shared/services/demandes.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from '../../shared/date.adapter';
@Component({
  selector: 'app-add-demande-dialog',
  templateUrl: './add-demande-dialog.component.html',
  styleUrls: ['./add-demande-dialog.component.scss'],
  providers: [
    {
      provide: DateAdapter, useClass: AppDateAdapter
    },
    {
      provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
  ]
})
export class AddDemandeDialogComponent {
  demandeForm
  $subs: Subscription;
  constructor(private demandeService: DemandesService,
    public dialogRef: MatDialogRef<AddDemandeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log('data', data)
    this.initForm()
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.demandeForm = new FormGroup({
      dated: new FormControl('', [
        Validators.required,

        Validators.minLength(4),
      ]),
      datef: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
      raison: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ])

    });
  }


  onSubmit() {
    this.$subs = this.demandeService.createDemande(new Date(this.demandeForm.value.dated), new Date(this.demandeForm.value.datef), this.demandeForm.value.raison)
      .subscribe(
        res => {
          if (res.status === "fail") {
            console.log("fail", res)

          } else {
            console.log("succes", res)
            this.dialogRef.close();
            this.demandeService.addTodemandeUser(res);
          }
        },
        (err: HttpErrorResponse) => {
          console.log("failfailfail", err)
          //this.requestError = err.message;
          // this.loading = false
        }, )

  }

}