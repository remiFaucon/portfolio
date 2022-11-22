import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TerminalComponent } from '../terminal/terminal.component';
import {HeaderComponent} from "../header/header.component";
import {FooterComponent} from "../footer/footer.component";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";


@NgModule({
    declarations: [
        HomeComponent,
        TerminalComponent,
        HeaderComponent,
        FooterComponent
    ],
  exports: [
    HeaderComponent,
    FooterComponent,
    TerminalComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MenuModule,
    ButtonModule,
  ]
})
export class HomeModule { }
