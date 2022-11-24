import { Component, OnInit } from '@angular/core';
import {Chip} from "primeng/chip";

// interface bizarre {
//   designation: string;
//   person: string[];
// }

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  emailError: boolean = false;

  emailAddress: string = "";
  emailObject: string = "";
  emailBody: string = "";
  objectList: string[] = [
    "obj 1",
    "obj 2",
    "obj 3",
  ];
  phoneNumber: string = "";

  constructor() { }

  validate(input: HTMLInputElement) {
    if(this.emailAddress.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      input.classList.remove("ng-invalid")
      this.emailError = false;
    }
    else {
      input.classList.add("ng-invalid")
      this.emailError = true;
    }
  }

  selectObject(object: Chip) {
    document.querySelector("p-chip .custom-chip")?.classList.remove("custom-chip")
    object.styleClass = "mr-2 custom-chip"
    this.emailObject = object.label
  }
}
