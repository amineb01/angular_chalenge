import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-demande-dialog',
  templateUrl: './add-demande-dialog.component.html',
  styleUrls: ['./add-demande-dialog.component.css']
})
export class AddDemandeDialogComponent {
  demandeForm
  constructor(
    public dialogRef: MatDialogRef<AddDemandeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { 
      console.log('data',data)
      this. initForm()
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  initForm() {
    this.demandeForm = new FormGroup({
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
}