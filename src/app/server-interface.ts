export interface ServerInterface {
  url: string;
  api: string;
  patient: string;
  report: string;
  panel: string;
  test: string;
  ward: string;
  create: string;
  get: string;
  get_all: string;
  update: string;
  delete: string;
  search: string;
  num_recs: number;
  recs_per_page: number;
  show_web_stuff: boolean;
}
