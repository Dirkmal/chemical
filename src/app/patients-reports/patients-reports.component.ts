import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../patient';
import { Report } from '../report';
import { AlertService } from '../alert.service';
import { RestService } from '../rest.service';
import { Misc } from '../misc_funcs';

@Component({
  selector: 'app-patients-reports',
  templateUrl: './patients-reports.component.html',
  styleUrls: ['./patients-reports.component.css']
})
export class PatientsReportsComponent implements OnInit, OnChanges {
  misc = new Misc;
  @ViewChild('edit_report_modal') er_toggle;
  @Input() patient: Patient;
  fullname: string;
  reports: Report[] = [];
  selected_report: Report;
  found = false;

  constructor(private rest: RestService, private router: Router, private alert_s: AlertService) { }

  ngOnInit() { }

  ngOnChanges() {
    this.reports = [];
    if (this.misc.isNotNull(this.patient)) {
      this.fullname = this.patient.first_name + ' ' + (this.patient.middle_name || ' ') + ' ' + this.patient.last_name;
    }

    if (this.misc.isNotNull(this.patient)) {
      this.rest.getReportsFor(this.patient.id).subscribe((res) => {
        if (this.misc.isNotNull(res)) {
          this.reports = res;
        } else {
          this.alert_s.errorAlert('No reports found for ' + this.fullname, false);
        }
      },
      (err) => {
        console.log(err);
        this.alert_s.errorAlert('No reports found for ' + this.fullname, false);
      });
    }
  }

  editReport(report: Report) {
    this.selected_report = report;
    this.er_toggle.openModal();
  }

  printReport(report) {
    this.router.navigateByUrl(`/preview/id/${report.id}`);
  }
}
