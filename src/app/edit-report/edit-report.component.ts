import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { AlertService } from '../alert.service';
import { Misc } from '../misc_funcs';
import { Report } from '../report';
import { Patient } from '../patient';
import { Panel } from '../panel';
import { SpecimenTest } from '../specimen_test';
import { SearchFilter } from '../search-filter';
import { PatientFilters, BasicFilters } from '../search-filters.enum';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.css']
})
export class EditReportComponent implements OnInit, OnChanges {
  misc = new Misc;
  @Input() report: Report;
  report_tests: SpecimenTest[];
  @ViewChild('testsModal') tm_trigger;

  patient = new Patient;
  full_name: string;
  tests: SpecimenTest[];
  panels: Panel[];

  constructor(private rest_service: RestService, private router: Router, private alert_s: AlertService) { }

  ngOnInit() {
    this.getTests();
    this.getPanels();
  }

  ngOnChanges() {
    if (this.misc.isNotNull(this.report)) {
      this.getPatientById(this.report.patient_id);
    }
  }

  getPatientById(patient_id) {
    this.rest_service.getPatient(patient_id).subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.patient = res;
        this.full_name = this.patient.first_name + ' ' + (this.patient.middle_name || '') + ' ' + this.patient.last_name;
      }
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
      this.alert_s.warningAlert('You need to specify a value for the test', false);
    }
  }

  removeTest(index: number) {
    if (confirm('Are you sure?')) {
      this.report.tests.splice(index, 1);
    }
  }

  updateReport(and_print: boolean = false) {
    this.rest_service.updateReport(this.report).subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.alert_s.successAlert('Report updated');
        this.report = res;
        console.log(this.report);
      }

      if (and_print) {
        this.printReport();
      }
    },
    (err) => {
      console.log(err);
      this.alert_s.errorAlert('Could not update report');
    });
  }

  printReport() {
    this.router.navigateByUrl(`/preview/id/${this.report.id}`);
  }

  getTests() {
    this.rest_service.getTests().subscribe((res) => {
      if (this.misc.isNotNull) {
        this.tests = res;
      }
    },
    (err) => {
      console.log('Error fetching tests: ', err);
    });
  }

  getPanels() {
    this.rest_service.getPanels().subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.panels = res;
      }
    },
    (err) => {
      console.log('Error fetching panels: ', err);
    });
  }

  getPanelTests(panel_id) {
    return this.misc.getObjectsWithKey(this.tests, 'panel_id', panel_id);
  }

  openTestsModal() {
    this.tm_trigger.openModal();
  }

  closeTestsModal() {
    // this.tm_trigger.dismiss();
    console.log('work on this');
  }
}
