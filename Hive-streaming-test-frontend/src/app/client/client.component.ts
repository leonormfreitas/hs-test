import { Component, Inject } from '@angular/core';
import { SocketsService } from '../sockets.service';
import { CpuUsageService } from '../cpu-usage.service'
import { ConnectionData, User } from '../utils';
import { NgFor, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NgFor,],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  window: any;

  /* constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = document.defaultView;


    const cpuUsageService = new CpuUsageService();
  } */
  constructor(private readonly _ipc: CpuUsageService) {
    this._ipc.on('pong', (event: Electron.IpcMessageEvent) => {
      console.log('pong');
    });

    this._ipc.send('ping');
  }

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
    /* const socketService = new SocketsService;

    socketService.joinNetwork(this.user);
    //this.userList = socketService.getConnectedUsers();
    socketService.getConnectedUsers().subscribe((users) => {
      this.userList = users.users;
    });
    console.log("service users ", this.userList);
    //this.socketService.disconnectFromNetwork(); */

    

    /* setInterval(() => {
      console.log(cpuUsageService.getCPUusage());
    }, 5000); */

    
  }

  /* disconnect = false;

  onSubmit() { 
    this.disconnectNetwork()
    this.disconnect = true;
    
   } */

}
