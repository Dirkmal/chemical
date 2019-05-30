import { Component, OnInit, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Router } from '@angular/router';
import { Misc } from './misc_funcs';
import { ServerInfoLoader as config } from './server-info-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Chemical Pathology';
  misc = new Misc;
  show_web_stuff = config.settings.show_web_stuff;

  constructor(private ngZone: NgZone, private es: ElectronService, private router: Router) { }

    ngOnInit() {
      if (this.es.isElectronApp) {
        this.es.ipcRenderer.on('navigateTo', (event, arg) => {
          this.ngZone.run(() => {
            this.router.navigate([arg]);
          });
        });
      }
    }
}
