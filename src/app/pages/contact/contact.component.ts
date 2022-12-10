import { Component, OnInit } from '@angular/core';
import {Chip} from "primeng/chip";
import {SeoService} from "../../services/SEO/seo.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
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

  constructor(private seo: SeoService, private http: HttpClient) { }

  ngOnInit(): void {
    this.seo.addTags(
      "Rémi Faucon - développeur junior",
      "contacter moi directement sur cette plateforme ou par mail"
    )
  }

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

  submit() {
    this.http.post("http://localhost:3000/mail", {
      email: this.emailAddress,
      phoneNumber: this.phoneNumber,
      object: this.emailObject,
      emailBody: this.emailBody
    }).subscribe(data => {
      console.log(data);
    })
  }
}
