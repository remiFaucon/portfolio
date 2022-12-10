import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RealisationComponent} from '../../components/realisation/realisation.component'
import {MenuItem} from "primeng/api";
import {SeoService} from "../../services/SEO/seo.service";

export type Realisation = {
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
  realisations: Realisation[] = [
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
      title: "le chat",
      date: new Date("06-01-2022"),
      description: "<p>plateforme de communication en direct via websocket basé sur le framework expressJs.</p>" +
        "<p>ce projet a ete developer dans le but de me familliariser avec ce frameork ainsi que  la notion de websocket.</p>",
      image: "/assets/images/lechat.png",
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
  real: Realisation = this.realisations[this.realisations.length-1];


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
    this.clickOnApp(document.querySelectorAll("app-Realisation"))
    this.clickOnApp(document.querySelectorAll(".p-dock-item:not(.p-dock-item:first-of-type) img"), true)
  }

  clickOnApp = (realisations: NodeListOf<Element>, appBar?: boolean) => {
    realisations.forEach(realisation => {
      realisation.addEventListener("click", () => {
        const id = realisation.getAttribute("data-id")!
        this.real = this.realisations[this.realisations.findIndex(realisation => realisation.id === Number.parseInt(id))];
        if (appBar) {
          realisation = document.querySelector("app-Realisation[data-id='" + id + "']")!
        }
        realisation.parentNode!.appendChild(realisation)
      })
    })
  }

  dateFormat(date: Date): string {
    const day = date.getDay() < 10 ? "0" + date.getDate() : date.getDate()
    const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    return day + "/" + month + "/" + date.getFullYear()
  }
}
