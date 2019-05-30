import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Panel } from '../panel';
import { SpecimenTest } from '../specimen_test';
import { RestService } from '../rest.service';
import { Misc } from '../misc_funcs';
import { AlertService } from '../alert.service';
import { FormControl } from '@angular/forms';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  misc = new Misc;
  tests: SpecimenTest[];
  all_panels: Panel[];

  found_test: SpecimenTest;
  queryTestField: FormControl = new FormControl();

  @Output() testAdded = new EventEmitter;

  constructor(private rest: RestService, private alert_s: AlertService) { }

  ngOnInit() {
    this.getTests();
    this.getPanels();
    this.queryTestField.valueChanges.pipe(debounceTime(200))
      .subscribe(term => this.findTest(term));
  }

  findTest(ttf) {
    if (this.misc.isNotNull(ttf)) {
      this.rest.getTest(ttf, false).subscribe(res => {
        if (this.misc.isNotNull(res)) {
          this.found_test = res;
        }
      },
      (err) => {
        console.log(err);
      });
    } else {
      this.alert_s.warningAlert('Enter a test name', false);
    }
  }

  addTest(test: SpecimenTest) {
    if (test.value) {
      this.testAdded.emit(test);
    } else {
      this.alert_s.errorAlert('You need to specify a value for the test', false);
    }
  }

  getTests() {
    this.rest.getTests().subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.tests = res;
      }
    },
    (err) => {
      console.log('Error fetching tests: ', err);
    });
  }

  getPanels() {
    this.rest.getPanels().subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.all_panels = res;
      }
    },
    (err) => {
      console.log('Error fetching panels: ', err);
    });
  }

  getPanelTests(panel_id) {
    return this.misc.getObjectsWithKey(this.tests, 'panel_id', panel_id);
  }
}
