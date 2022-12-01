import { Component, OnInit } from '@angular/core';
import {SeoService} from "../../services/SEO/seo.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.addTags(
      "Rémi Faucon - développeur junior",
      "about me myself and I"
    )
  }

}
