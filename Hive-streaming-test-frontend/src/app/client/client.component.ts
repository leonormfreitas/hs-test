import { Component } from '@angular/core';
import { SocketsService } from '../sockets.service';
import { ConnectionData, User } from '../utils';
import { NgFor } from '@angular/common';
import {CPUUsage} from 'electron'

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NgFor,],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  constructor() {}

  userList: Array<User> = [];
  user = {room: "1234", email: "client@example.com"};



  /*disconnectNetwork(): void {
    this.socketService.disconnectFromNetwork();
  }
 */
  ngOnInit(): void {
    console.log("Started ");
    // const cpu: CPUUsage = 
  }

  onConnect() : void {
    console.log("connect")
    const socketService = new SocketsService;

    socketService.joinNetwork(this.user);
    //this.userList = socketService.getConnectedUsers();
    socketService.getConnectedUsers().subscribe((users) => {
      this.userList = users.users;
    });
    console.log("service users ", this.userList);
    //this.socketService.disconnectFromNetwork();
  }

  /* disconnect = false;

  onSubmit() { 
    this.disconnectNetwork()
    this.disconnect = true;
    
   } */

}
