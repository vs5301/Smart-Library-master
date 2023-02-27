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
    public editForm =  FormGroup
    planData: any = [] 
    planObj: Plans ={
      planId: '',
      plan: '',
      bookIssueLimit: 0,
      bookReturnPeriod: 0,
      price: 0
    }
    closeResult = '';
    display = "none";
   

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
    this.editForm = this.fb.group
    ({ 
      planId:[doc(collection(this.firestore, "plans")).id],
      plan:["",Validators.required],
      bookIssueLimit:["",Validators.required],
      bookReturnPeriod:["", Validators.required ],
      price:["", Validators.required],
      
    })
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

  getAllPlan(){
    this.memberService.fetchPlans().subscribe((res:Plans[])=>{
    console.log(res)
    this.planData = res
  })
  }

  deletePlan(plan:Plans){
    let decision = confirm("Are you sure you want to delete this Plan?")
    if(decision == true){
      this.memberService.deletePlans(plan)
    }
  }

  updatePlan(plan:Plans){
    const (value) = this.editForm
    console.log(value)
  }
}
