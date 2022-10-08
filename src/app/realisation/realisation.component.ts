import {Component, Input, OnInit} from '@angular/core';
import { realisation } from '../realisations/realisations.component';

@Component({
  selector: 'app-realisation',
  templateUrl: './realisation.component.html',
  styleUrls: ['./realisation.component.scss']
})
export class RealisationComponent implements OnInit {
  @Input() realisation!: realisation;

  constructor() { }

  ngOnInit(): void {
  }
  dateFormat(date: Date): string {
    const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
    const month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
    return day + "/" + month + "/" + date.getFullYear()
  }
}
