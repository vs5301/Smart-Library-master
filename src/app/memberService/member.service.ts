import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, doc, collectionData, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Plans } from 'app/models/plans';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(    private fireservices: Firestore ) {}

    form = new FormGroup({
    $key: new FormControl(null),
    plan: new FormControl('',Validators.required),
    bookIssueLimit: new FormControl('',Validators.required),
    bookReturnPeriod: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required)
  });
  
  fetchPlans(){
      let planRef = collection(this.fireservices, 'plans')
      return collectionData(planRef, {idField: 'id'})
  }

  deletePlans(plan:Plans){
    let plansRef = doc(collection(this.fireservices,`plans/${plan.planId}`))
    return deleteDoc(plansRef)
  }

  updatePlans(plans: Plans, plan: any){
    let planRef = doc(this.fireservices, `Plans,${plans.planId}`)
    return updateDoc(planRef, plan)
  }
}