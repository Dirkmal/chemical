import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient';
import { RestService } from '../rest.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { Misc } from '../misc_funcs';
import { SearchFilter } from '../search-filter';
import { PatientFilters } from '../search-filters.enum';

@Component({
  selector: 'app-newpatient',
  templateUrl: './newpatient.component.html',
  styleUrls: ['./newpatient.component.css']
})
export class NewpatientComponent implements OnInit {
  misc = new Misc;
  patient = new Patient;
  confirm_patient: Patient;

  constructor(private rest: RestService, private alert_s: AlertService, private router: Router) { }

  ngOnInit() { }

  newPatient(f, create_report?: boolean) {
    if (this.misc.isNotNull(this.confirm_patient) && this.confirm_patient.hospital_num === this.patient.hospital_num) {
      this.alert_s.warningAlert('Cannot use this hospital number');
    } else {
      this.rest.addPatient(this.patient).subscribe((res) => {
        if (this.misc.isNotNull(res)) {
          this.patient = res;
          this.alert_s.successAlert('Patient registered');
          f.reset();

          if (create_report) {
            this.createReport();
          }
        }
      });
    }
  }

  createReport() {
    this.router.navigateByUrl(`/create_report/p_id/${this.patient.id}`);
  }

  checkHospitalNum() {
    if (this.misc.isNotNull(this.patient.hospital_num) && this.patient.hospital_num !== 'NYR') {
      const sf = new SearchFilter(PatientFilters.by_hnum, this.patient.hospital_num);

      // this.rest.getPatient(sf).subscribe((res) => {
      //   if (this.misc.isNotNull(res)) {
      //     this.confirm_patient = res;
      //   } else {
      //     this.confirm_patient = null;
      //   }
      // });
    }
  }

  calculateAge() {
    if (this.misc.isNotNull(this.patient.dob)) {
      const dob = new Date(this.patient.dob);
      const today = new Date();
      this.patient.age = today.getFullYear() - dob.getFullYear();
    }
  }
}
