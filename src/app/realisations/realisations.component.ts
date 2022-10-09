import { Component, OnInit } from '@angular/core';

export type realisation = {
  title: string;
  image: string;
  date: Date;
  description: string;
  link: string;
}

@Component({
  selector: 'app-realisations',
  templateUrl: './realisations.component.html',
  styleUrls: ['./realisations.component.scss']
})
export class RealisationsComponent implements OnInit {
  realisations: realisation[] = [
    {
      title: "title",
      date: new Date("01-01-2001"),
      description: "lorem ipsum",
      image: "/assets/panda.jpg",
      link: "google.com"
    },
    {
      title: "title",
      date: new Date("01-01-2001"),
      description: "lorem ipsumlorem ipsumlorem ipsu",
      image: "/assets/panda.jpg",
      link: "google.com"
    },
    {
      title: "title",
      date: new Date("01-01-2001"),
      description: "lorem ipsum",
      image: "/assets/panda.jpg",
      link: "google.com"
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
