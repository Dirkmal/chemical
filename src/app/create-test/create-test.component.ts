import { Component, OnInit } from '@angular/core';
import { SpecimenTest } from '../specimen_test';
import { Panel } from '../panel';
import { RestService } from '../rest.service';
import { AlertService } from '../alert.service';
import { Misc } from '../misc_funcs';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})

export class CreateTestComponent implements OnInit {
  misc = new Misc;
  test = new SpecimenTest;
  all_tests: SpecimenTest[];
  selected_test = new SpecimenTest;

  new_panel = new Panel;
  selected_panel = new Panel;
  panels: Panel[];

  constructor(private rest_service: RestService, private alert_s: AlertService) { }

  ngOnInit() { }


  selectTest(test: SpecimenTest) {
    this.selected_test = test;
  }

  addTest(f) {
    this.test.panel_id = this.selected_panel.id;

    this.rest_service.addTest(this.test).subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.all_tests.push(res);
        this.alert_s.successAlert('Test added');
        f.reset();
      } else {
        this.alert_s.errorAlert('Could not add test');
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('Could not add test');
    });
  }
}
