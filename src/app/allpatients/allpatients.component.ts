import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../patient';
import { RestService } from '../rest.service';
import { ServerInfoLoader as config } from '../server-info-loader';
import { Misc } from '../misc_funcs';
import { AlertService } from '../alert.service';
import { SearchFilter } from '../search-filter';
import { BasicFilters } from '../search-filters.enum';

@Component({
  selector: 'app-allpatients',
  templateUrl: './allpatients.component.html',
  styleUrls: ['./allpatients.component.css']
})
export class AllpatientsComponent implements OnInit {
  @ViewChild('edit_patient_modal') ep_trigg;
  @ViewChild('viewR') viewREl;
  misc = new Misc;
  @Input() patients: Patient[] = [];
  edit_patient: Patient;
  view_reports: Patient;

  search_param: string;
  search_results: Patient[] = [];
  search_result_num: number;
  loaded_searches = 0;
  searched = false;

  loaded = 0;
  num_recs: number;
  pages: number;
  recs_per_page = config.settings.recs_per_page;
  page_number: number;

  constructor(private rest: RestService, private router: Router, private alert_s: AlertService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients() {
    this.rest.getPatients().subscribe((res) => {
      if (this.misc.isNotNull(res)) {
        this.patients = this.patients.concat(res);
      } else {
        this.alert_s.errorAlert('No patients registered');
      }
    },
    (err) => {
      console.log('Error fetching patients', err);
      this.alert_s.errorAlert('Something went wrong');
    });
  }

  editPatient(patient: Patient) {
    this.edit_patient = patient;
    this.ep_trigg.openModal();
  }

  viewReports(patient: Patient) {
    this.view_reports = patient;
    // document.getElementById('viewR').scrollIntoView();
  }

  addReportFor(patient_id) {
    this.router.navigateByUrl(`/create_report/p_id/${patient_id}`);
  }

  search(search_term) {
    if (this.misc.isNotNull(search_term)) {
      this.rest.searchPatients(search_term).subscribe((res) => {
        if (res !== null && res !== undefined) {
          this.search_results = this.search_results.concat(res);
        } else {
          this.alert_s.errorAlert(`No patients found for "${this.search_param}"`);
        }
      },
      (err) => {
        console.log('Error fetching patients', err);
        this.alert_s.errorAlert('Error fetching results for search');
      });
    } else {
      this.alert_s.errorAlert('Enter a search term');
    }
  }
}
