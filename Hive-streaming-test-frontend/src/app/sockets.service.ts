import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { ConnectionData, User } from './utils';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  constructor(){console.log("Service")}

  socket: Socket = io('http://localhost:4000');


  joinNetwork(userData: ConnectionData){
    console.log("Join frontend ");
    this.socket.emit("join_room", userData);
  }

  getConnectedUsers() {
    let observable = new Observable<{ users: any }>(observer => {
      this.socket.on('all_users', (data) => {
        observer.next(data);
      });
    });
    return observable;
      /* this.socket.on('all_users', (data) => {
        console.log("users connected", data.users)
        return data.users;
      }); */
  }

  disconnectFromNetwork() {
    //this.socket.emit("disconnect_user");
    this.socket.disconnect();
    //wouldn't be necessary in a real p2p connection, disconnect would happen after data exchange through WebRTC

  }


}
