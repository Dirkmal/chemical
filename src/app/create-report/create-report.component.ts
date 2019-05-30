import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../patient';
import { SpecimenTest } from '../specimen_test';
import { Report } from '../report';
import { Panel } from '../panel';
import { RestService } from '../rest.service';
import { Misc } from '../misc_funcs';
import { AlertService } from '../alert.service';
import { BasicFilters } from '../search-filters.enum';
import { SearchFilter } from '../search-filter';
import { Ward } from '../ward';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent implements OnInit {
  @ViewChild('tests_modal') test_modal_trigger;
  misc = new Misc;

  patient: Patient;
  report = new Report;

  wards: Ward[];
  tests: SpecimenTest[];
  added_tests: SpecimenTest[] = [];
  all_panels: Panel[];

  constructor(private rest: RestService, private alert_s: AlertService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('p_id')) {
        const id = params['p_id'];
        this.getPatient(id);
      } else {
        this.router.navigate(['allr']);
      }
    });
    this.getWards();
  }

  getWards() {
    this.rest.getWards().subscribe(res => {
      if (this.misc.isNotNull(res)) {
        this.wards = res;
      }
    },
    (err) => {
      console.log(err);
    });
  }

  getPatient(id: number) {
    this.rest.getPatient(id).subscribe(res => {
      if (this.misc.isNotNull(res)) {
        this.patient = res;
      } else {
        this.alert_s.errorAlert('Patient not found');
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('An error occurred');
    });
  }

  addTest(test: SpecimenTest) {
    if (test.value) {
      if (this.misc.objectExistsInArray(this.report.tests, 'id', test.id)) {
        this.misc.updateObjectInArray(this.report.tests, test);
        this.alert_s.infoAlert('Test updated', false);
      } else {
        this.alert_s.infoAlert('Test added', false);
        this.report.tests.push(test);
      }
    } else {
      this.alert_s.errorAlert('You need to specify a value for the test', false);
    }
  }

  removeTest(index: number) {
    if (confirm('Are you sure?')) {
      this.report.tests.splice(index, 1);
    }
  }

  addReport(f) {
    if (this.report.tests.length === 0 ) {
      this.alert_s.infoAlert('No tests added', false);
    } else {
      this.report.patient_id = this.patient.id;
      this.report.hospital_num = this.patient.hospital_num;
      // this.report.tests = this.added_tests;

      this.rest.addReport(this.report).subscribe((res) => {
        if (this.misc.isNotNull(res)) {
          this.alert_s.successAlert('Report registered');
          // this.report = res;
          console.log(res);
          this.resetStuff();
          f.reset();
        } else {
          this.alert_s.warningAlert('Could not register report');
        }
      },
      (err) => {
        console.log(err);
        this.alert_s.errorAlert('Could not register report');
      });
    }
  }

  resetStuff() {
    this.added_tests = [];
  }

  openTestModal() {
    this.test_modal_trigger.openModal();
  }
}
