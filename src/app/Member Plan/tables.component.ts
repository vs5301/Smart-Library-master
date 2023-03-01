import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { MemberService } from 'app/memberService/member.service';
import { Plans } from 'app/models/plans';


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
    planForm: FormGroup 
    plansList: Plans[] = []
    planObj : Plans = {
      id: '',
      plan: '',
      bookIssueLimit: '',
      bookReturnPeriod: '',
      price: ''
    }
    id: string = ''
    plan: string = ''
    bookIssueLimit: string = ''
    bookReturnPeriod: string = ''
    price: string = ''

    closeResult = '';
    display = "none";
    editdisplay = "none"
   

  constructor( private fb : FormBuilder, 
               private firestore: Firestore, 
               private memberService: MemberService) {
    this.planForm = this.fb.group
    ({ 
      planId:[doc(collection(this.firestore, "plans")).id],
      plan:["",Validators.required],
      bookIssueLimit:["",Validators.required],
      bookReturnPeriod:["", Validators.required ],
      price:["", Validators.required],
      
    })
    /*this.editForm = this.fb.group
    ({ 
      planId:[doc(collection(this.firestore, "plans")).id],
      plan:["",Validators.required],
      bookIssueLimit:["",Validators.required],
      bookReturnPeriod:["", Validators.required ],
      price:["", Validators.required],
      
    })*/
   }

  submitted: boolean;
  showSuccessMessage: boolean;

  ngOnInit(): void {
      
       this.tableData1 = {
           headerRow: ['PLAN', 'BOOK ISSUE LIMIT',
                       'BOOK RETURN PERIOD','PRICE', 'ACTION'],
           dataRows: []
      };
      
      this.getAllPlan()
  }

  saveUserInFirestore() 
    {
    let value = { ...this.planForm.value };
    console.log(value);
    
    let docRef = doc(this.firestore, `plans/${value.planId}`);
    setDoc(docRef, { ...value })
      .then(() => {
        console.log("Saved");
        this.planForm.reset();
        
      }, (error) => {
        console.log(error);
        
      })
    }


  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  addPlan(){
    if(this.plan == '' || this.bookIssueLimit == '' || this.bookReturnPeriod == '' || this.price == '')
    alert('Please provide complete input!')

    this.planObj.id = ''
    this.planObj.plan = this.plan
    this.planObj.bookIssueLimit = this.bookIssueLimit
    this.planObj.bookReturnPeriod = this.bookReturnPeriod
    this.planObj.price = this.price

    this.memberService.addPlans(this.planObj)

    this.planForm.reset
  }
  getAllPlan(){
    this.memberService.fetchPlans().subscribe(res => {
      this.plansList = res.map((e:any) => {
        const data = e.payload.doc.data()
        data.id = e.payload.doc.id;
        return data
      })
    }, err =>{
      alert('Eror while fetching plans list')
    })
  }
  
  updatePlans(){
      this.planObj.id = this.planForm.value.id
      this.planObj.plan = this.planForm.value.plan
      this.planObj.bookIssueLimit = this.planForm.value.bookIssueLimit
      this.planObj.bookReturnPeriod = this.planForm.value.bookReturnPeriod
      this.planObj.price = this.planForm.value.price

      this.memberService.updatePlans(this.planObj)     
  }

  deletePlans(plans: Plans){ 
    if(window.confirm('Are you sure you want to delete '+ plans.plan + '? '))
    this.memberService.deletePlans(plans)
  }
 
  /*
  updatePlan(plan:Plans){
    const (value) = this.editForm
    console.log(value)
  }*/
}
