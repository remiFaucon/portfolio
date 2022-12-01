import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TerminalComponent } from '../../components/terminal/terminal.component';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {MessageModule} from "primeng/message";


@NgModule({
  declarations: [
    HomeComponent,
    TerminalComponent,
    HeaderComponent,
    FooterComponent,
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
    FormsModule,
    MessageModule,
  ]
})
export class HomeModule { }
