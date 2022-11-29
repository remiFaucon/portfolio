interface User {
  name: string;
  messages: Message[];
}
interface Message {
  text: string;
  class: string;
}

import { Component, OnInit } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  messageInput?: string;
  thisUser: number = 0;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on("connect", () => {
      this.socket.emit('admin connection')
      this.socket.on('user connected', (email: string) => this.users.push({name: email, messages: []}))
    })
  }

  send() {
    if (this.messageInput != null) {
      this.socket.emit('message from admin', this.messageInput)

      this.users[this.thisUser].messages.push({ text: this.messageInput, class: 'send'});
    }
    this.messageInput = undefined
  }

  setThisUser(name: string) {
    for (let i = 0; i < this.users.length; i){
      if (this.users[i].name === name){
        this.thisUser = i
      }
    }
  }
}
