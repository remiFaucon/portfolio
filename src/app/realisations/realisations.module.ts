import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealisationsRoutingModule } from './realisations-routing.module';
import { RealisationsComponent } from './realisations.component';


@NgModule({
  declarations: [
    RealisationsComponent
  ],
  imports: [
    CommonModule,
    RealisationsRoutingModule
  ]
})
export class RealisationsModule { }
