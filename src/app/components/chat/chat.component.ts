import {Component, Input, OnInit} from '@angular/core';
import {Socket} from "ngx-socket-io";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  public hidden = false;
  public messages: {text: string, severity?: string, class?: string}[] = [];
  @Input() messageInput: string | undefined;
  registered: boolean = false;

  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.messages.push({ text: "saisisez une adresse email", severity: "info"});
    this.socket.on('connected', () => this.registered = true);
    this.socket.on('message from admin', (message: string) =>
      this.messages.push({ text: message, class: 'receive'}));
    this.socket.on('not connected', () => this.messages.push({text: "l'email n'est pas valide", severity: "error"}));
  }

  send() {
    if (!this.registered) {
      this.socket.emit('connection', this.messageInput);
    }
    else {
      if (this.messageInput != null) {
        this.socket.emit('message for admin', this.messageInput)
        this.messages.push({ text: this.messageInput, class: 'send'});
      }
    }
    this.messageInput = undefined
  }
}
