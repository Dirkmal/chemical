import { Component, OnInit } from '@angular/core';
import { Misc } from '../misc_funcs';
import { RestService } from '../rest.service';
import { AlertService } from '../alert.service';
import { Panel } from '../panel';
import { SpecimenTest } from '../specimen_test';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.css']
})
export class PanelsComponent implements OnInit {
  misc = new Misc;
  new_panel: Panel;
  panels: Panel[] = [];
  tests: SpecimenTest[] = [];

  constructor(private rest: RestService, private alert_s: AlertService) { }

  ngOnInit() {
  }

  newPanel(c) {
    this.rest.addPanel(this.new_panel).subscribe(res => {
      if (this.misc.isNotNull(res)) {
        this.panels.push(res);
        this.alert_s.successAlert('Panel added');
        c.reset();
      } else {
        this.alert_s.errorAlert('Could not create panel');
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('Error, Could not create panel');
    });
  }

  deletePanel(index: number) {
    if (confirm('Are you sure? This will delete the panel and move its tests to the general panel')) {
      this.rest.deletePanel(index).subscribe((res) => {
        if (this.misc.isNotNull(res)) {
          this.alert_s.successAlert('Panel deleted');
        } else {
          this.alert_s.errorAlert('Could not delete panel');
        }
      },
      (err) => {
        console.log(err);
        this.alert_s.errorAlert('Could not delete panel');
      });
    }
  }

  getTests() {
    this.rest.getTests().subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.tests = res;
      } else {
        this.alert_s.errorAlert('No tests registered');
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('Could not fetch tests');
    });
  }

  deleteTest(index: number) {
    if (confirm('Are you sure?')) {
      this.rest.deleteTest(index).subscribe((res) => {
        if (this.misc.isNotNull(res)) {
          this.alert_s.successAlert('Test deleted');
        } else {
          this.alert_s.errorAlert('Could not delete test');
        }
      },
      (err) => {
        console.log(err);
        this.alert_s.errorAlert('Could not delete test');
      });
    }
  }

  getPanels() {
    this.rest.getPanels()
    .subscribe((res: Panel[]) => {
      if (res !== null && res !== undefined) {
        this.panels = res;
      } else {
        this.alert_s.errorAlert('No panels registered');
      }
    },
    (err) => {
      console.log('Error fetching panels: ', err);
      this.alert_s.errorAlert('No panels registered');
    });
  }

  getTestsInPanel(panel_id) {
    return this.misc.getObjectsWithKey(this.tests, 'panel_id', panel_id);
  }
}
