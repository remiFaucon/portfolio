import {Component, Input, OnInit} from '@angular/core';
import { Realisation } from '../../pages/realisations/realisations.component';

@Component({
  selector: 'app-realisation',
  templateUrl: './realisation.component.html',
  styleUrls: ['./realisation.component.scss']
})
export class RealisationComponent implements OnInit {
  @Input() realisation!: Realisation;

  constructor() { }

  ngOnInit(): void {
  }
}
