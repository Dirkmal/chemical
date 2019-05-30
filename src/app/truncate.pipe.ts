import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  /**
   * Reduces the length of a text if its more than the specified limit
   * @param value the string to reduce
   * @param limit the maximum length of the string to return (10 by default)
   * @param complete_words whether to cut off words exceeding the limit or keep them whole (FALSE by default)
   * @param ellipses the kind of ellipses to use (... by default)
   * @return shortened string
   */
  transform(value: string, limit = 10, complete_words = false, ellipses = '...'): string {
    if (complete_words) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    if (value.length <= limit) {
      ellipses = '';
    }
    return `${value.substr(0, limit)}${ellipses}`;
  }
}
