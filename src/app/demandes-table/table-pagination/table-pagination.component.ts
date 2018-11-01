import { Component, OnInit,ViewChild,Output,EventEmitter } from '@angular/core';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css']
})
export class TablePaginationComponent implements OnInit {
  @Output() pageIndexChange = new EventEmitter();
  length = 100;
  pageSize = 10;
  pageEvent: PageEvent;

  constructor() { }

  ngOnInit() {
  }

  onPaginateChange(event){
    console.log("test",event.pageIndex)
    this.pageIndexChange.emit(event.pageIndex);
  }

}
