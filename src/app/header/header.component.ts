import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.underline(this.location.path())
    let header = document.querySelector("header")!
    header.addEventListener("click", () => {
        this.underline(this.location.path())
    })
  }



  underline(path: string): void {
    const nav = document.querySelectorAll("app-header a")
    nav.forEach((a) => {
      if (a.getAttribute("routerLink") === path){
        a.classList.add("underline")
      }
      else {
        if (a.classList.contains("underline")){
          a.classList.remove("underline")
        }
      }
    })
  }
}
