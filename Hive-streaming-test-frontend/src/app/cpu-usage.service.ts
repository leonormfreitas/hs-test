import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CpuUsageService {

  private _ipc: IpcRenderer | undefined;

  constructor() {
    if (window.require) {
      try {
        this._ipc = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron\'s IPC was not loaded');
    }
    
  }

   public on(channel: string, listener: any): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.on(channel, listener);
  }

  public send(channel: string, ...args: any): void {
    if (!this._ipc) {
      return;
    }
    this._ipc.send(channel, ...args);
  }

/*   getCPUusage() {
    return new Observable<any>(observer => {
      this.ipc.once('getCPUusageResponse', (event, arg) => {
        console.log("in ipc")
        observer.next(arg);
      });

      this.ipc.send('getCPUusage');
    });
    //return window.electron?.getCPUUsage();
  } */
}
