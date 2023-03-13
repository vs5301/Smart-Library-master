import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, collectionData, doc, deleteDoc, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MemberService } from 'app/memberService/member.service';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  public tableData1: TableData;
  // planForm: FormGroup
  userData!: Observable<any>;
  addView = false;
  updateMode: boolean = false;
  updatePlanId: any
  planData: any
  planList: any

   planForm = new FormGroup(
    {
      planId : new FormControl(),
      plan : new FormControl(),
      bookIssueLimit : new FormControl(),
      bookReturnPeriod : new FormControl(),
      price : new FormControl()
    }
  )

  

  // plansList: Plans[] = []
  // planObj: Plans = {
  //   id: '',
  //   plan: '',
  //   bookIssueLimit: '',
  //   bookReturnPeriod: '',
  //   price: ''
  // }
  // id: string = ''
  // plan: string = ''
  // bookIssueLimit: string = ''
  // bookReturnPeriod: string = ''
  // price: string = ''


  closeResult = '';
  display = "none";
  editdisplay = "none";
  adddisplay = "none"

  constructor( private fb: FormBuilder,
               private firestore: Firestore,
               public ms: MemberService ) {     
  this.getData();
 }

 action: String = "";


  ngOnInit(): void {

    this.tableData1 = {
      headerRow: ['PLAN', 'BOOK ISSUE LIMIT', 'BOOK RETURN PERIOD', 'PRICE', 'ACTION'],
      dataRows: []
    };

    this.planForm = this.fb.group
      ({
        planId: [doc(collection(this.firestore, "plans")).id],
        plan: ["", Validators.required],
        bookIssueLimit: ["", Validators.required],
        bookReturnPeriod: ["", Validators.required],
        price: ["", Validators.required],

      })
   
        this.addView = true;
        this.updateMode = true;
  }

  addData() {
    let value = { ...this.planForm.value };
    console.log(value);

    let docRef = doc(this.firestore, `plans/${value.planId}`);
    setDoc(docRef, { ...value })
      .then(() => {
        console.log("Saved");
        this.planForm.reset;
        this.addonCloseHandled()
      }, (error) => {
        console.log(error);

      })      
  }

  getData() {
    const collectionInstance = collection(this.firestore,'plans');
    collectionData(collectionInstance, { idField: 'id' })
    .subscribe(() => {
    //  console.log(val);
    })
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }

  updateData() {
    let value: any = { ...this.planForm.value}
    console.log("Id in update method "+this.updatePlanId)
    let docRef = doc(this.firestore, `plans/${this.updatePlanId}`)
    setDoc(docRef,{...value})
    this.planForm.reset
    this.editonCloseHandled()

  }

  async updateDataToFb(id: any){
    console.log("Id passed to update function "+id)
    this.updatePlanId = id
  }
  
  deleteData(id: string) {
   const docInstance = doc(this.firestore, 'plans', id);
   deleteDoc(docInstance)
   .then(() => {
     console.log('Data Deleted')
   })
  }
 

  editopenModal(plan: any = null) {
    this.editdisplay = "block";
    this.initialisedPlanForm(plan)
    console.log("Id in open Modal function "+plan.id)
  }

  editonCloseHandled() {
    this.editdisplay = "none";
  }

  addopenModal() {
    this.adddisplay = "block";
  }

  addonCloseHandled() {
    this.adddisplay = "none";
  }

  initialisedPlanForm(plan: any = null) {
    if(plan === null) {
      this.planForm = this.fb.group({
        planId: [""],
        plan: [""],
        bookIssueLimit: [""],
        bookReturnPeriod: [""],
        price: [""]
      })
    } else {
      this.planForm = this.fb.group({
        planId: [plan.planId],
        plan: [plan.plan],
        bookIssueLimit: [plan.bookIssueLimit],
        bookReturnPeriod: [plan.bookReturnPeriod],
        price: [plan.price]
      })
    }

  }
}
