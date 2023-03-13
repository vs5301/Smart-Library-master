import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, setDoc, Timestamp   } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Storage, ref, getDownloadURL, uploadBytes } from '@angular/fire/storage';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public file: any
  public tableData1: TableData;
  addbookform!: FormGroup;
  userData!: Observable<any>
  closeResult = '';
  display = "none";
  editDisplay = "none";
  path:string
  bookList: any
  bookData: any
  action: String = ""

  constructor( private modalService: NgbModal ,
    private fb : FormBuilder,
    private firestore: Firestore, 
    private route: ActivatedRoute,
    public storage: Storage ) { 
      this.getData()
    }

    pickFile(event: any){
      this.file = event.target.files[0]
      console.log(this.file)
    }

  ngOnInit() {

    this.tableData1 = {
      headerRow: ['TITLE','AUTHOR','TAGS','PRICE','ISBN','AVAILABLE','ISSUED','ACTION'],
      dataRows: [
      ]
  };
    this.addbookform = this.fb.group({ 
      bookId:[doc(collection(this.firestore, "books")).id],
      title:["",Validators.required],
      author:["",Validators.required],
      tags:["",Validators.required],
      price:["",Validators.required],
      isbn:["",Validators.required], 
      quantity:["",Validators.required], 
      coverImage:["",Validators.required] 
    })   
  }

  async uploadImage() {
    let dataToSave = this.addbookform.value;
    console.log(this.file);
    // const uploadTask = uploadBytesResumable(storageRef, this.file);
    // uploadTask.on("state_changed", (snapshot) => {
    //   console.log(snapshot);
    // }, (error) => {
    //   console.log("Error is ", error);
    // }, () => {
    //   getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //     console.log('File available at', downloadURL);
    //     const dataToSave = this.addbookform.value;
    //     dataToSave['coverimage'] = downloadURL;
    //     dataToSave['creationTime'] = Timestamp.now();
    //     console.log("dataToSave is: " + dataToSave);
    //     const booksCollection = collection(this.firestore, 'books');
    //     addDoc(booksCollection, dataToSave);
    //     console.log("Cover Image Added");
    //   })
    // })
  }

  async addBook(){
    let value = { ...this.addbookform.value };
      console.log(value);
      console.log(this.file);
      // let docRef = doc(this.firestore, `books/${value.bookId}`);
      const storageRef = ref(this.storage, 'images/' + this.file.name);
      await uploadBytes(storageRef, this.file);
      value['coverimage'] = await getDownloadURL(storageRef);
      console.log(value['coverimage']);
      value['creationTime'] = Timestamp.now();
      console.log("value is: ", value);
      let docRef = doc(this.firestore, `books/${value.bookId}`);
      // const booksCollection = collection(this.firestore, 'books');
      // addDoc(booksCollection, value);
      console.log("Cover Image Added");
      setDoc(docRef, { ...value })
        .then(() => {
          console.log("Saved");
          this.addbookform.reset();
          this.onCloseHandled();
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

  updateData(id: any) {
    this.addbookform = new FormGroup({
      bookId : new FormControl(id.bookId),
      title : new FormControl(id.title),
      author : new FormControl(id.author),
      tags : new FormControl(id.tags),
      price : new FormControl(id.price),
      isbn : new FormControl(id.isbn),
      quantity : new FormControl(id.quantity)
      
      
    })

    const docInstance = doc(this.firestore, 'books', id);
    const updateData = this.addbookform.value;
    updateDoc(docInstance, updateData)
    .then(() => {
      console.log('Data Update');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'books', id);
    deleteDoc(docInstance)
    .then(() => {
      console.log('Data Deleted')
    })
   }

  openModal1(){
    this.display = "block";
  }
  onCloseHandled(){
    this.display = "none";
  } 

  editopenModal1(){
    this.editDisplay = "block";
  }
  editonCloseHandled(){
    this.editDisplay = "none";
  } 

  upload($event){
    this.path = $event.target.files[0]
  }
}