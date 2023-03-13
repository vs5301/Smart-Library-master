import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements OnInit {
  display = "none";

  constructor() { }

  ngOnInit() { }

openModal2() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
