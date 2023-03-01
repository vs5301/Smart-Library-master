import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plans } from 'app/models/plans';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(    private afs: AngularFirestore) {}

    form = new FormGroup({
    $key: new FormControl(null),
    plan: new FormControl('',Validators.required),
    bookIssueLimit: new FormControl('',Validators.required),
    bookReturnPeriod: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required)
  });
  
  addPlans(plan: Plans){
      plan.id = this.afs.createId()
      return this.afs.collection('plans').add(plan)
  }

  fetchPlans(){
      return this.afs.collection('plans').snapshotChanges()
  }

  deletePlans(plan:Plans){
    return this.afs.doc('plans'+plan.id).delete()
  }

  updatePlans(plans: Plans){
    this.deletePlans(plans)
    this.addPlans(plans)  
  }
}