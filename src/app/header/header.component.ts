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
    document.querySelectorAll("app-header a").forEach(a => a.classList.remove("underline"))
    document.querySelector("app-header a[routerLink='" + path + "']")?.classList.add("underline")
  }
}
