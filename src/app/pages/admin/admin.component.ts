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

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.socket.on("connect", () => {
      this.socket.emit('admin connection')
      this.socket.on('user connected', (email: string) => this.users.push({name: email, messages: []}))
      this.socket.on('message', (message: { author: string; message: any; }) => {
        if (this.users.some((user) => user.name === message.author)){
          this.users[this.users.findIndex(user => user.name == message.author)].messages.push({text: message.message, class: "receive"});
        }
      })
    })
  }

  send(name: string) {
    if (this.messageInput != null) {
      this.socket.emit('message to user', {name: name, message: this.messageInput})
      for (let i = 0; i < this.users.length; i){
        if (this.users[i].name === name){
          this.users[i].messages.push({ text: this.messageInput, class: 'send'});
          break
        }
      }
    }
    this.messageInput = undefined
  }
}
