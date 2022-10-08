import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealisationsRoutingModule } from './realisations-routing.module';
import { RealisationsComponent } from './realisations.component';
import { RealisationComponent } from '../realisation/realisation.component';
import {FormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";


@NgModule({
  declarations: [
    RealisationsComponent,
    RealisationComponent
  ],
    imports: [
        CommonModule,
        RealisationsRoutingModule,
        FormsModule,
        HomeModule
    ]
})
export class RealisationsModule { }
