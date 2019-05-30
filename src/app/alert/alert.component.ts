import { Component, OnInit } from '@angular/core';
import { Alert } from '../alert';
import { AlertService } from '../alert.service';
import { Misc } from '../misc_funcs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Alert[] = [];
  misc = new Misc;
  timerId = [];

  constructor(private alert_s: AlertService) { }

  ngOnInit() {
    this.getAlerts();
  }

  getAlerts() {
    this.alert_s.new_alert.subscribe((alert) => {
      if (this.misc.isNotNull(alert)) {
        this.alerts.push(alert);
        if (!alert.dismissible) {
          setTimeout(() => this.dismissAlert(alert), 5000);
        }
      }
    });
  }

  dismissAlert(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }
}
