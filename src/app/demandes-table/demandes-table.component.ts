
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/internal/Subscription';
import { DemandesService } from '../shared/services/demandes.service';
import { MatDialog } from '@angular/material';
import { DemandeDetailsComponent } from './../dialogs/demande-details/demande-details.component';

export interface PeriodicElement {
  date_debut: string;
  id: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-demandes-table',
  templateUrl: './demandes-table.component.html',
  styleUrls: ['./demandes-table.component.scss']
})
export class DemandesTableComponent implements OnInit {
  demandesList = []
  displayedColumns: string[] = ['id', 'username','date_debut', 'date_fin', 'actions'];
  @Input() type;

  dataSource = new MatTableDataSource(this.demandesList);
  pageIndex: number = 0;
  @ViewChild(MatSort) sort: MatSort;
  lastRowName
  $subs: Subscription

  constructor(public dialog: MatDialog,private demandesService: DemandesService) { }

  ngOnInit() {

    this.dataSource.sort = this.sort;
    console.log(this.type)
    this.getDemandes();

  }


  getDemandes() {
    if (this.type === "valider")
      this.lastRowName = "Action";
    else 
      this.lastRowName = "Status"

    if (this.type === "valider") {

        this.demandesService.getvalidDemandeForAdmin(this.pageIndex).subscribe(res => {
          this.updateDataSource(res);
        })
        this.demandesService.validDemande$.subscribe(res => {
          this.updateDataSource(res);
        })

    }

    else if (this.type === "encours") {
        this.demandesService.getinprocessDemandeForAdmin(this.pageIndex).subscribe(res => {
          this.updateDataSource(res);

        })
        this.demandesService.inprocessDemande$.subscribe(res => {
          this.updateDataSource(res);
        })

    } else {
        this.demandesService.getDemandeForUser(this.pageIndex).subscribe(res => {
          this.updateDataSource(res);
        })

        this.demandesService.demandeUSer$.subscribe(res => {
          this.updateDataSource(res);
        })
    }


  }

  updateDataSource(res) {
    this.demandesList = res
    this.dataSource = new MatTableDataSource(this.demandesList);
  }
  ChangePageIndex(_pageIndex) {
    this.pageIndex = _pageIndex
    this.getDemandes();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  valider(element) {
    this.updateDemande(true, element)

  }
  rejecter(element) {

    this.updateDemande(false, element)
  }

  updateDemande(status, element) {
    this.demandesService.setDemandeResponse(element.id, status).subscribe(res => {
      let index = this.demandesList.findIndex(demande => demande.id === element.id);
      this.demandesList.splice(index, 1);
      this.demandesService.addTovalidDemandeForAdmin(element)
      this.demandesService.inprocessDemandeSubject.next(this.demandesList)
    })
  }

  openDialogForShowingDetails(element): void {
    const dialogRef = this.dialog.open(DemandeDetailsComponent, {
      data: element
    });

    
  }
}