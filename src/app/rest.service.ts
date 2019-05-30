import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { SpecimenTest } from './specimen_test';
import { Patient } from './patient';
import { Report } from './report';
import { Panel } from './panel';
import { ServerInfoLoader as config } from './server-info-loader';
import { Misc } from './misc_funcs';
import { Ward } from './ward';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  apiUrl = config.settings.url + config.settings.api;
  reportBase = this.apiUrl + config.settings.report;
  patientBase = this.apiUrl + config.settings.patient;
  panelBase = this.apiUrl + config.settings.panel;
  testBase = this.apiUrl + config.settings.test;
  wardBase = this.apiUrl + config.settings.ward;
  create = config.settings.create;
  update = config.settings.update;
  delete = config.settings.delete;
  search = config.settings.search;
  get = config.settings.get;
  get_all = config.settings.get_all;

  misc = new Misc;
  // for each get request, one page has been loaded i.e 10 records = 1 page, 20 records = 2 pages
  // so use page number as offset in requesting next records.... I hope I understand this.
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error.error.message);
  }

  // getNumRecs(record): Observable<any> {
  //   const sf = new SearchFilter(LimitFilters.start_at, record);
  //   const ops  = this.misc.buildParams(sf);

  //   return this.http.get(this.apiUrl + config.settings.num_recs, {params: ops})
  //   .pipe(map((res) => {
  //     return this.misc.getResponse(res);
  //   }),
  //     catchError(this.handleError)
  //   );
  // }

  addWard(ward: Ward): Observable<Ward> {
    return this.http.post(this.wardBase + this.create, {data: ward})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError));
  }

  getWards(): Observable<Ward[]> {
    return this.http.get(this.wardBase + this.get_all)
      .pipe(map(res => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError));
  }

  addPanel(panel: Panel): Observable<Panel> {
    return this.http.post(this.panelBase + this.create, {data: panel})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError));
  }

  updatePanel(panel: Panel): Observable<Panel> {
    return this.http.put(this.panelBase + this.update, {data: panel})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError));
  }

  getPanels(): Observable<Panel[]> {
    return this.http.get(this.panelBase + this.get_all)
    .pipe(map((res) => {
      return this.misc.getResponse(res);
    }),
      catchError(this.handleError)
    );
  }

  deletePanel(index: number): Observable<Boolean> {
    const ops = this.misc.buildParam('id', index);
    // move tests in this panel to a general panel
    return this.http.delete(this.panelBase + this.delete, {params: ops})
      .pipe(map((res) => {
        return this.misc.getResponse(res, true);
      }),
      catchError(this.handleError)
    );
  }

  addTest(test: SpecimenTest): Observable<SpecimenTest> {
    return this.http.post(this.testBase + this.create, {data: test})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError));
  }

  deleteTest(index: number): Observable<Boolean> {
    const ops = this.misc.buildParam('id', index);

    return this.http.delete(this.testBase + this.delete, {params: ops})
      .pipe(map((res) => {
        return this.misc.getResponse(res, true);
      }),
      catchError(this.handleError)
    );
  }

  getTests(): Observable<SpecimenTest[]> {
    return this.http.get(this.testBase + this.get_all)
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  getTest(identifier, by_id = true): Observable<SpecimenTest> {
    let filter_name = 'id';
    if (!by_id) {
      filter_name = 'name';
    }

    const ops = this.misc.buildParam(filter_name, identifier);

    return this.http.get(this.testBase + this.get, {params: ops})
      .pipe(map(res => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
      );
  }

  updateTest(test: SpecimenTest): Observable<SpecimenTest> {
    return this.http.put(this.testBase + this.update, {data: test})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  addPatient(patient: Patient): Observable<Patient> {
    return this.http.post(this.patientBase + this.create, {data: patient})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError));
  }

  updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put(this.patientBase + this.update, {data: patient})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  getPatients(page_number?: number): Observable<Patient[]> {
    let ops;
    if (page_number) {
      ops = this.misc.buildParam('page', page_number);
    }

    return this.http.get(this.patientBase + this.get_all, {params: ops})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  getPatient(identifier, by_id = true): Observable<Patient> {
    let filter_name = 'id';
    if (!by_id) {
      filter_name = 'hospital_num';
    }

    const ops = this.misc.buildParam(filter_name, identifier);

    return this.http.get(this.patientBase + this.get, {params: ops})
    .pipe(map((res) => {
      return this.misc.getResponse(res);
    }),
      catchError(this.handleError)
    );
  }

  searchPatients(search_param): Observable<Patient[]> {
    const ops = this.misc.buildParam('term', search_param);

    return this.http.get(this.patientBase + this.search, {params: ops})
    .pipe(map((res) => {
      return this.misc.getResponse(res);
    }),
      catchError(this.handleError)
    );
  }

  addReport(report: Report): Observable<Report> {
    return this.http.post(this.reportBase + this.create, {data: report})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  getReports(page_number?: number): Observable<Report[]> {
    let ops;
    if (page_number) {
      ops = this.misc.buildParam('page', page_number);
    }
    return this.http.get(this.reportBase + this.get_all, {params: ops})
      .pipe(map((res: Report[]) => {
        return this.misc.getResponse(res, false, true);
      }),
      catchError(this.handleError)
    );
  }

  getReport(identifier: number, by_id = true): Observable<Report> {
    const filter_names = [];
    filter_names.push('id');
    if (!by_id) {
      filter_names.push('lab_num');
    }
    const ops = this.misc.buildParam(filter_names, identifier);

    return this.http.get(this.reportBase + this.get, {params: ops})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  getReportsFor(patient_id: number, page_number?: number): Observable<Report[]> {
    const ops = this.misc.buildParam('p_id', patient_id);

    return this.http.get(this.reportBase + this.get_all, {params: ops})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }

  searchReports(search_param, page_number?: number): Observable<Report[]> {
    let ops = new HttpParams();
    ops = ops.set('term', search_param.toString());

    if (this.misc.isNotNull(page_number)) {
      ops = ops.set('page', page_number.toString());
    }
    return this.http.get(this.reportBase + this.search, {params: ops})
      .pipe(map((res) => {
        return this.misc.getResponse(res, false, true);
      }),
      catchError(this.handleError)
    );
  }

  updateReport(report: Report): Observable<Report> {
    return this.http.put(this.reportBase + this.update, {data: report})
      .pipe(map((res) => {
        return this.misc.getResponse(res);
      }),
      catchError(this.handleError)
    );
  }
}
