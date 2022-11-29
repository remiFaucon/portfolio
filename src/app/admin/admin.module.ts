import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AccordionModule} from "primeng/accordion";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {AdminRoutingModule} from "./admin-routing.module";



@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AccordionModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
