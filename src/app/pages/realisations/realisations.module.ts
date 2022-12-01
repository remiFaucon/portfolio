import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealisationsRoutingModule } from './realisations-routing.module';
import { RealisationsComponent } from './realisations.component';
import { RealisationComponent } from '../../components/realisation/realisation.component';
import {FormsModule} from "@angular/forms";
import {HomeModule} from "../home/home.module";
import {DockModule} from "primeng/dock";


@NgModule({
  declarations: [
    RealisationsComponent,
    RealisationComponent
  ],
    imports: [
        CommonModule,
        RealisationsRoutingModule,
        FormsModule,
        HomeModule,
        DockModule
    ]
})
export class RealisationsModule { }
