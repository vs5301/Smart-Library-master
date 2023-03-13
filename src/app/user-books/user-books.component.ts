import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { collection, doc, Firestore, setDoc, updateDoc, deleteDoc, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.scss']
})
export class UserBooksComponent implements OnInit {
  public tableData1: TableData;
  userData!: Observable<any>;
  addbookform!: FormGroup;
  issueform!: FormGroup;
  closeResult = '';
  display = "none";
  path:string

  constructor( private modalService: NgbModal ,
    private fb : FormBuilder,
    private firestore: Firestore, 
    private route: ActivatedRoute, )
    
     { this.getData(); }

  ngOnInit() {

    this.tableData1 = {
      headerRow: ['TITLE','AUTHOR','TAGS','PRICE','AVAILABLE',''],
      dataRows: [
      ]
  };
  
  this.addbookform = this.fb.group({ 
    bookId:[doc(collection(this.firestore, "library")).id],
    title:[""],
    author:[""],
    tags:[""],
    price:[""], 
    quantity:[""]
  })   

  this.issueform = this.fb.group({ 
    bookId:[doc(collection(this.firestore, "issued")).id],
    userId:[""],
    title:[""],
    author:[""],
    issueDate:[""], 
    returnDate:[""],
    tags:[""],
    price:[""], 
    quantity:[""]
  })  

  }

  addData() 
  {
  let value = { ...this.addbookform.value };
  console.log(value);
  let docRef = doc(this.firestore, `library/${value.bookId}`);
  setDoc(docRef, { ...value })
    .then(() => {
      console.log("Saved");
      let ref = document.getElementById('cancel');
      this.addbookform.reset();
      
    }, (error) => {
      console.log(error);  
    })
  }

  addIssueData() 
  {
  let value = { ...this.issueform.value };
  console.log(value);
  let docRef = doc(this.firestore, `issued/${value.bookId}`);
  setDoc(docRef, { ...value })
    .then(() => {
      console.log("Saved");
      let ref = document.getElementById('cancel');
      this.addbookform.reset();
      
    }, (error) => {
      console.log(error);  
    })
  }


  getData() {
    const collectionInstance = collection(this.firestore,'books');
    collectionData(collectionInstance, { idField: 'id' })
    .subscribe(val => {
    //  console.log(val);
    })
    this.userData = collectionData(collectionInstance, { idField: 'id' });
  }
  

  initialisedBookForm(books: any = null) {
    if(books === null) {
      this.addbookform = this.fb.group({
        bookId: [""],
        title: [""],
        author: [""],
        tags:[""],
        price:[""], 
        quantity:[""]
      })
    } else {
      this.addbookform = this.fb.group({
        bookId: [books.bookId],
        title: [books.title],
        author: [books.author],
        tags: [books.tags],
        price: [books.price],
        quantity: [books.quantity]
      })

      this.issueform = this.fb.group({
        bookId: [books.bookId],
        title: [books.title],
        author: [books.author],
        tags: [books.tags],
        price: [books.price],
        quantity: [books.quantity]
      })
    }

  }

       openModal1(books: any = null) {
      this.display = "block";
      this.initialisedBookForm(books)
      }
      onCloseHandled() {
      this.display = "none";
      } 
  
    //  upload($event){
    //   this.path = $event.target.files[0]
    //  }

}








