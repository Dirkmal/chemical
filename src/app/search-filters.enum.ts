export enum PatientFilters {
  by_name = 'name',
  by_hnum = 'hospital',
}

export enum ReportFilters {
  patient_id = 'p_id',
  by_id = 'r_id',
}

export enum LimitFilters {
  by_test = 'test',
  start_at = 'start',
  end_at = 'end',
  single_result = 'single',
  multiple_results = 'multiple'
}

export enum BasicFilters {
  by_value = 'value',
  all = 'all',
  by_id = 'id'
}

export enum TestFilters {
  by_panel = 'panel_id'
}
