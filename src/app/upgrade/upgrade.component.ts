import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collection, Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.css']
})
export class UpgradeComponent implements OnInit {
  public tableData1: TableData;
  userData!: Observable<any>;


  constructor( // private ab : FormBuilder,
    private firestore: Firestore, )
    
     { this.getData(); }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['PLAN', 'BOOK ISSUE LIMIT', 'BOOK RETURN PERIOD','PRICE', 'ACTION'],
      dataRows: []
 };
 
  }

  getData() {
    const collectionInstance = collection(this.firestore,'plans');
    collectionData(collectionInstance, { idField: 'id' })
    .subscribe(() => {
    //  console.log(val);
    })
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

}