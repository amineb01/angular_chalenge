import { Demande } from './../../shared/Model/Demande';
import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent {
demande:Demande;
  constructor(
    public dialogRef: MatDialogRef<DemandeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    console.log('data', data)
    this.demande=data
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
