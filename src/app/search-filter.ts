export class SearchFilter {
  name: string;
  value: string;

  constructor(filter_name: string, filter_value: any) {
    this.name = filter_name;
    this.value = filter_value.toString();
  }
}
