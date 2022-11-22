import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import {HomeModule} from "../home/home.module";
import {EditorModule} from "primeng/editor";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ChipModule} from "primeng/chip";
import {PanelMenuModule} from "primeng/panelmenu";
import {InputMaskModule} from "primeng/inputmask";


@NgModule({
  declarations: [
    ContactComponent
  ],
    imports: [
        CommonModule,
        ContactRoutingModule,
        HomeModule,
        EditorModule,
        FormsModule,
        InputTextModule,
        ChipModule,
        PanelMenuModule,
        InputMaskModule
    ]
})
export class ContactModule { }
