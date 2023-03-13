import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collection, Firestore, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

declare interface TableData {
	headerRow: string[];
	dataRows: string[][];
  }

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
	public tableData1: TableData;
	userData!: Observable<any>;

	constructor( private firestore: Firestore, )
		
		 { this.getData(); }

  ngOnInit() { 

	this.tableData1 = {
		headerRow: ['USER ID','BOOK ISSUED','AUTHOR','ISSUE DATE','RETURN DATE'],
		dataRows: [
		]
	};

  }

  getData() {
    const collectionInstance = collection(this.firestore,'issued');
    collectionData(collectionInstance, { idField: 'id' })
    .subscribe(() => {
    //  console.log(val);
    })
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

}