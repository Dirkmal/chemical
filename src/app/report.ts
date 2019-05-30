import { SpecimenTest } from './specimen_test';

export class Report {
  id?: string;
  lab_num?: string;
  patient_id: number;
  hospital_num: string;
  ward: string;
  tests: SpecimenTest[] = [];
  specimen: string;
  sample_type: string;
  date_measured: string;
  date_collected: string;
  date_reported: string;
  comment: string;
  consultant: string;
  approved?: string;
  created_on?: string;
}
