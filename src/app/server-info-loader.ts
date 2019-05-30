import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ServerInterface } from './server-interface';
import { ElectronService } from 'ngx-electron';
import { Misc } from './misc_funcs';

@Injectable({
  providedIn: 'root'
})

export class ServerInfoLoader {
  static settings: ServerInterface;
  misc = new Misc;
  show_web_stuff =  true;
  constructor(private es: ElectronService, private http: HttpClient) {}

  load() {
    let server_address = null;
    if (this.es.isElectronApp) {
      server_address = this.es.ipcRenderer.sendSync('getApiUrl');
      this.show_web_stuff = false;
    }

    const jsonFile = `assets/config/serverinfo.${environment.name}.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response) => {
        ServerInfoLoader.settings = <ServerInterface> response;
        ServerInfoLoader.settings.show_web_stuff = this.show_web_stuff;
        if (server_address !== null) {
          ServerInfoLoader.settings.url = server_address;
        }
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}
