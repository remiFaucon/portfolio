import { Component, OnInit } from '@angular/core';
import {SeoService} from "../../services/SEO/seo.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.addTags(
      "Rémi Faucon - développeur junior",
      "je présente ici les service que je propose"
    )
  }

}
