import { Component, Inject } from '@angular/core';
import { SocketsService } from '../services/sockets.service';
import { CpuUsageService } from '../services/cpu-usage.service'
import { ConnectionData, User } from '../utils';
import { NgFor, NgIf, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

  //window: any;

  /* constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = document.defaultView;


    
  } */
  /*constructor( private readonly _ipc: CpuUsageService ) {
    /* this._ipc.on('pong', (event: Electron.IpcMessageEvent) => {
      console.log('pong');
    });

    this._ipc.send('ping'); 
  }*/

  constructor() {
  
  }

  cpuUsageService = new CpuUsageService();
  currentCPUusage: string = "";

  userList: Array<User> = [];
  user = {room: "1234", email: "client@example.com"};

  connected: boolean = false;

  /*disconnectNetwork(): void {
    this.socketService.disconnectFromNetwork();
  }
 */
  ngOnInit(): void {
    console.log("Started ");
  }

  onConnect() : void {
    console.log("connect")
    const socketService = new SocketsService;

    if(this.connected){
      console.log("disconnect")
      this.connected = false;
      socketService.disconnectFromNetwork();
    }
    else{
      socketService.joinNetwork(this.user);
      this.connected = true
      //this.userList = socketService.getConnectedUsers();
      socketService.getConnectedUsers().subscribe((users) => {
        this.userList = users.users;
      });
      console.log("service users ", this.userList);
      //this.socketService.disconnectFromNetwork();

    }

    setInterval(() => {
      this.currentCPUusage = String(Math.round(Number(this.cpuUsageService.getCPUusage())*100))
      console.log("cpuUsage",this.currentCPUusage);
    }, 5000);
    
  }

  

  /* disconnect = false;

  onSubmit() { 
    this.disconnectNetwork()
    this.disconnect = true;
    
   } */

}
