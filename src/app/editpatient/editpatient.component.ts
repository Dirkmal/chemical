import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Patient } from '../patient';
import { RestService } from '../rest.service';
import { AlertService } from '../alert.service';
import { Misc } from '../misc_funcs';
import { SearchFilter } from '../search-filter';
import { PatientFilters } from '../search-filters.enum';

@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.css']
})
export class EditpatientComponent implements OnInit, OnChanges {
  misc = new Misc;
  @Input() patient: Patient;
  confirm_patient: Patient;

  current_hnum: string; // to store the hnum before it is edited, for later comparison

  constructor(private rest: RestService, private alert_s: AlertService) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.rest.misc.isNotNull(this.patient)) {
      this.current_hnum = this.patient.hospital_num;
    }
  }

  updatePatient(f) {
    if (this.misc.isNotNull(this.confirm_patient) && this.confirm_patient.hospital_num !== this.current_hnum) {
      this.alert_s.warningAlert('Cannot use this hospital number');
      this.patient.hospital_num = this.current_hnum;
    } else {
      this.rest.updatePatient(this.patient).subscribe((res) => {
        if (this.misc.isNotNull(res)) {
          this.patient = res;
          console.log(res);
          this.alert_s.successAlert('Patient information updated');
        }
      },
      (err) => {
        console.log(err);
        this.alert_s.errorAlert(err);
      });
    }
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
}
