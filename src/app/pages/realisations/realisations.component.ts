import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RealisationComponent} from '../../components/realisation/realisation.component'
import {MenuItem} from "primeng/api";
import {SeoService} from "../../services/SEO/seo.service";

export type realisation = {
  id: number;
  title: string;
  image: string;
  date: Date;
  description: string;
  link: string;
}

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss'],
})
export class RealisationsComponent implements OnInit {
  realisations: realisation[] = [
    {
      id: 0,
      title: "panda",
      date: new Date("01-01-2001"),
      description: "lorem ipsum",
      image: "/assets/panda.jpg",
      link: "google.com"
    },
    {
      id: 1,
      title: "bois",
      date: new Date("01-01-2001"),
      description: "lorem ipsumlorem ipsumlorem ipsu",
      image: "/assets/bois.jpg",
      link: "google.com"
    },
    {
      id: 2,
      title: "title",
      date: new Date("01-01-2001"),
      description: "lorem ipsum",
      image: "/assets/apart.jpeg",
      link: "google.com"
    }
  ]
  dockItems: MenuItem[] = [
    {
      label: 'Terminal',
      tooltipOptions: {
        tooltipLabel: "Terminal",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/images/dock/terminal.svg",
      id: "terminal",
      command: () => {
        this.terminal = !this.terminal;
      }
    },
    {
      label: 'Github',
      tooltipOptions: {
        tooltipLabel: "Github",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/images/dock/github.svg",
      id: "github",
      command: () => {
        window.location.href = "https://github.com/Gmalodo";
      }
    },
    {
      label: 'Malt',
      tooltipOptions: {
        tooltipLabel: "Malt",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/images/dock/malt.svg",
      id: "malt",
      command: () => {
        window.location.href = "https://malt.fr/";
      }
    },
    {
      label: 'Linkedin',
      tooltipOptions: {
        tooltipLabel: "Linkedin",
        tooltipPosition: 'top',
        positionTop: -15,
        positionLeft: 15
      },
      icon: "assets/images/dock/linkedin.svg",
      id: "linkedin",
      command: () => {
        window.location.href = "https://linkedin.com/";
      }
    },

  ];
  terminal: boolean = false;

  constructor(private seo: SeoService) { }

  ngOnInit(): void {
    this.seo.addTags(
      "Rémi Faucon - développeur junior",
      "voici quelques'une de mes realisations"
    )

    this.realisations.forEach((realisation) => {
      this.dockItems = [
        ...this.dockItems,
        {
          label: realisation.title,
          tooltipOptions: {
            tooltipLabel: realisation.title,
            tooltipPosition: 'top',
            positionTop: -15,
            positionLeft: 15
          },
          icon: "assets/images/dock/web_browser.svg",
          id: `${realisation.id}`,
        }
      ]
    })
  }
  ngAfterViewInit(): void {
    const detailsTitle = document.querySelector('#details h2')!
    const detailsDate = document.querySelector('#details p')!
    const details = document.querySelector('#details p:last-of-type')!

    detailsTitle.innerHTML = this.realisations[this.realisations.length-1].title
    detailsDate.innerHTML = RealisationComponent.dateFormat(this.realisations[this.realisations.length-1].date)
    details.innerHTML = this.realisations[this.realisations.length-1].description

    this.clickOnApp(document.querySelectorAll("app-realisation"))
    this.clickOnApp(document.querySelectorAll(".p-dock-item:not(.p-dock-item:first-of-type) img"), true)
  }

  clickOnApp = (realisations: NodeListOf<Element>, appBar?: boolean) => {
    const detailsTitle = document.querySelector('#details h2')!
    const detailsDate = document.querySelector('#details p')!
    const details = document.querySelector('#details p:last-of-type')!

    realisations.forEach(realisation => {
      realisation.addEventListener("click", () => {
        const id = realisation.getAttribute("data-id")!
        console.log(id)
        const realObj = this.realisations[+id]
        detailsTitle.innerHTML = realObj.title
        detailsDate.innerHTML = RealisationComponent.dateFormat(realObj.date)
        details.innerHTML = realObj.description
        if (appBar) {
          realisation = document.querySelector("app-realisation[data-id='" + id + "']")!
          console.log(realisation)
        }
        realisation.parentNode!.appendChild(realisation)
      })
    })
  }

}
