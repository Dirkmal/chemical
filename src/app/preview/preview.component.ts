import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Report } from '../report';
import { Patient } from '../patient';
import { SpecimenTest } from '../specimen_test';
import { AlertService } from '../alert.service';
import { Misc } from '../misc_funcs';
import { ActivatedRoute } from '@angular/router';
import { SearchFilter } from '../search-filter';
import { BasicFilters } from '../search-filters.enum';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  misc = new Misc;
  report: Report;
  patient: Patient;
  curr_date: any = new Date();
  dd: any = this.curr_date.getDate();
  mm: any = this.curr_date.getMonth() + 1;
  yy: any = this.curr_date.getFullYear();

  constructor(private rest: RestService, private alert_s: AlertService, private route: ActivatedRoute) { }

  setCurrentDate() {
    if (this.dd < 10) {
      this.dd = '0' + this.dd;
    }

    if (this.mm < 10) {
      this.mm = '0' + this.mm;
    }
    this.curr_date = this.yy + '-' + this.mm + '-' + this.dd;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.getReportDetails(params['id']);
      }
    });
  }

  getReportDetails(report_id: number) {
    const sf = new SearchFilter(BasicFilters.by_id, report_id);
    // this.rest.getReport(sf).subscribe((res) => {
    //   if (this.misc.isNotNull(res)) {
    //     this.report = res;

    //     this.getPatient(this.report.patient_id);
    //   }
    // },
    // (err) => {
    //   console.log(err);
    //   this.alert_s.errorAlert('Could not fetch report details');
    // });
  }

  getPatient(patient_id: number) {
    const sf = new SearchFilter(BasicFilters.by_id, patient_id);
    // this.rest.getPatient(sf).subscribe(res => {
    //   if (this.misc.isNotNull(res)) {
    //     this.patient = res;
    //   }
    // },
    // (err) => {
    //   console.log(err);
    //   this.alert_s.errorAlert('Could not fetch patient information');
    // });
  }

  print() {
    document.getElementById('print_btn').hidden = true;
    window.print();
  }
}
