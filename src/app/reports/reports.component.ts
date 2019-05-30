import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Report } from '../report';
import { Router } from '@angular/router';
import { Misc } from '../misc_funcs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  misc = new Misc;
  @Input() reports: Array<Report[]>;
  @Input() pages: number;
  @Input() count: number;
  page = 1;
  pageSize = 10;
  @Output() pageToLoad = new EventEmitter;
  @ViewChild('edit_report') er_modal_toggle;
  selected_report: Report;

  constructor(private router: Router) { }

  ngOnInit() { }

  selectReport(report: Report) {
    this.selected_report = report;
    this.er_modal_toggle.openModal();
  }

  printReport(report: Report) {
    this.router.navigateByUrl(`/preview/id/${report.id}`);
  }

  loadPage(page_to_load) {
    if (!this.misc.isNotNull(this.reports[page_to_load - 1])) {
      this.pageToLoad.next(page_to_load);
    }
  }
}
