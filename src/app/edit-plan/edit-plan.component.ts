import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-edit-plan',
  templateUrl: './edit-plan.component.html',
  styleUrls: ['./edit-plan.component.scss']
})
export class EditPlanComponent implements OnInit {
  public tableData1: TableData;

  constructor() { }

  ngOnInit(): void {
    this.tableData1 = {
      headerRow: ['USER ID','EMAIL ID','SUBSCRIPTION','SUBSCRIPTION EXPIRATION DATE','BOOKS ISSUED','DATE','PERMISSIONS'],
      dataRows: [
      ]
  };
  }

}
