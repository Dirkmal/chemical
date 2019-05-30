import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { Report } from '../report';
import { Router } from '@angular/router';
import { Misc } from '../misc_funcs';
import { AlertService } from '../alert.service';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-allreports',
  templateUrl: './allreports.component.html',
  styleUrls: ['./allreports.component.css']
})
export class AllreportsComponent implements OnInit {
  misc = new Misc;
  reports: Array<Report[]> = [];
  found_reports: Report[] = [];
  foo: string;

  num_of_reports = 0;
  num_of_search_reports = 0;
  queryReportField: FormControl = new FormControl();

  constructor(private rest: RestService, private alert_s: AlertService) { }

  ngOnInit() {
    this.getReports();
    this.queryReportField.valueChanges.pipe(debounceTime(200))
      .subscribe(term => this.searchReports(1, term));
  }

  searchReports(page = 1, term: string) {
    if (this.misc.isNotNull(term)) {
      this.rest.searchReports(term, page).subscribe(res => {
        if (this.misc.isNotNull(res)) {
          this.found_reports[page - 1] = res['data'];
          this.num_of_search_reports = res['extra'];
        }
      },
      (err) => {
        console.log(err);
      });
    } else {
      this.alert_s.warningAlert('Enter a search term', false);
    }
  }

  getReports(page = 1) {
    this.rest.getReports(page).subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.reports[page - 1] = res['data'];
        this.num_of_reports = res['extra'];
      } else {
        this.alert_s.errorAlert('No reports found');
      }
    },
    (err) => {
      console.log('Error, ', err);
      this.alert_s.errorAlert('No reports found');
    });
  }
}
