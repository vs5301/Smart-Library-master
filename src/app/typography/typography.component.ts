import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collection, doc, Firestore, deleteDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  public tableData1: TableData;
  userData!: Observable<any>;


  constructor( private firestore: Firestore, )
    
     { this.getData(); }

  ngOnInit() {
    this.tableData1 = {
      headerRow: ['TITLE','AUTHOR','TAGS','RETURN DATE',''],
      dataRows: [
      ]
  };
  }

  getData() {
    const collectionInstance = collection(this.firestore,'library');
    collectionData(collectionInstance, { idField: 'id' })
    .subscribe(() => {
    //  console.log(val);
    })
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'library', id);
    deleteDoc(docInstance)
    .then(() => {
      console.log('Data Deleted')
    })
   }

}