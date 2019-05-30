import { Component, OnInit, Input, Output } from '@angular/core';
import { RestService } from '../rest.service';
import { SpecimenTest } from '../specimen_test';
import { Misc } from '../misc_funcs';
import { AlertService } from '../alert.service';
import { Panel } from '../panel';

@Component({
  selector: 'app-edit-test',
  templateUrl: './edit-test.component.html',
  styleUrls: ['./edit-test.component.css']
})
export class EditTestComponent implements OnInit {
  misc = new Misc;
  @Input() test: SpecimenTest;
  @Output() updated_test: SpecimenTest;
  current_panel: Panel;
  panels: Panel[] = [];

  constructor(private rest: RestService, private alert_s: AlertService) { }

  ngOnInit() {
  }

  updateTest(d) {
    this.rest.updateTest(this.test).subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.updated_test = res;
        this.alert_s.successAlert('Test updated');
        d.reset();
      } else {
        this.alert_s.errorAlert('Could not update test');
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('Could not update test');
    });
  }

  getPanels() {
    this.rest.getPanels().subscribe(res => {
      if (this.misc.isNotNull(res)) {
        this.panels = res;
        this.setCurrentPanel(res, this.test.panel_id);
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('Could not fetch panels');
    });
  }

  setCurrentPanel(panels_arr: Panel[], panel_id) {
    this.current_panel = this.misc.getObjectsWithKey(panels_arr, 'id', panel_id);
  }
}
