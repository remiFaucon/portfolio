import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {MenuItem} from "primeng/api";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  icon: string = 'pi pi-bars';
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Acceuil',
        icon: 'pi pi-home',
        routerLink: '/'
      },
      {
        label: 'Services',
        icon: 'pi pi-desktop',
        routerLink: '/services'
      },
      {
        label: 'Réalisations',
        icon: 'pi pi-code',
        routerLink: '/realisations'
      },
      {
        label: 'A propos',
        icon: 'pi pi-ellipsis-h',
        routerLink: '/a-propos'
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        routerLink: '/contact'
      },
    ]
  }

  iconMenu() {
    if (this.icon === 'pi pi-bars') {
      this.icon = 'pi pi-times'
    }
    else {
      this.icon = 'pi pi-bars'
    }
  }
}
