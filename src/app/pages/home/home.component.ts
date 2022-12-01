import { Component, OnInit } from '@angular/core';
import {SeoService} from "../../services/SEO/seo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.addTags(
      "Rémi Faucon - développeur junior",
      "bienvenue sur mon site pour l'internet, bon surfage de web a toi"
    )
  }

}
