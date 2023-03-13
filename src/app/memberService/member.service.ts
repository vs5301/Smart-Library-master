import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseApp } from '@angular/fire/app';
import { initializeApp } from '@firebase/app';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor( ) { this.app = initializeApp(environment.firebase) }

    form = new FormGroup({
    $key: new FormControl(null),
    plan: new FormControl('',Validators.required),
    bookIssueLimit: new FormControl('',Validators.required),
    bookReturnPeriod: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required)
  });
  
  app: FirebaseApp
  
}