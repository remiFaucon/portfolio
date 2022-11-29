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
import {ChatComponent} from "../chat/chat.component";
import {MessageModule} from "primeng/message";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    ContactComponent,
    ChatComponent
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
    InputMaskModule,
    MessageModule,
    ButtonModule,
    RippleModule
  ]
})
export class ContactModule { }
