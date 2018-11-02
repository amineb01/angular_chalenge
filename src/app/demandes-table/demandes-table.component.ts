
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/internal/Subscription';
import { DemandesService } from '../shared/services/demandes.service';

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
  displayedColumns: string[] = ['id', 'date_debut', 'date_fin', 'actions'];
  @Input() type;

  dataSource = new MatTableDataSource(this.demandesList);
  pageIndex: number = 0;
  @ViewChild(MatSort) sort: MatSort;
  lastRowName
  $subs: Subscription

  constructor(private demandesService: DemandesService) { }

  ngOnInit() {

    this.dataSource.sort = this.sort;
    console.log(this.type)
    this.getDemandes();

  }


  getDemandes() {
    if (this.type === "valider") {
      this.lastRowName = "Action";
      this.demandesService.getvalidDemandeForAdmin(this.pageIndex).subscribe(res => {
        this.demandesList = res
        this.dataSource = new MatTableDataSource(this.demandesList);

      })

    }

    else if (this.type === "encours") {
      this.lastRowName = "Status"
      this.demandesService.getinprocessDemandeForAdmin(this.pageIndex).subscribe(res => {
        this.demandesList = res
        this.dataSource = new MatTableDataSource(this.demandesList);

      })

    } else {
      this.demandesService.getDemandeForUser(this.pageIndex).subscribe(res => {
        this.demandesList = res
        this.dataSource = new MatTableDataSource(this.demandesList);
      })

      this.demandesService.demandeUSer$.subscribe(res => {
        this.demandesList = res
        this.dataSource = new MatTableDataSource(this.demandesList);
      })
      this.lastRowName = "Status"
    }


  }
  ChangePageIndex(_pageIndex) {
    this.pageIndex = _pageIndex
    console.log("displayfromdemandes", this.pageIndex)
    this.getDemandes();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  valider(element) {
    this.demandesService.setDemandeResponse(element.id, true).subscribe(res => {
      let index = this.demandesList.findIndex(demande => demande.id === res.id);
      this.demandesList.splice(index, 1);
      console.log("element valider", element)
      console.log("index", index)
    } )
  }
  rejecter(element) {
    this.demandesService.setDemandeResponse(element.id, false).subscribe(res => {
      let index = this.demandesList.findIndex(demande => demande.id === element.id);
      this.demandesList.splice(index, 1);
      console.log("element valider", element)
      console.log("index", index)
    } )

  }



}