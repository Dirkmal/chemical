import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { SearchFilter } from './search-filter';

/**
 * Class of useful but unrelated functions
 */

export class Misc {
  /**
   * returns the size of a value in bytes as well as the unit (B, KB, e.t.c)
   * also checks if the size is greater than kilobytes
   * @param unformatted_size value whose size to check
   */
    getSize(unformatted_size: number) {
        let unit = 'B';
        let kb = false;

        if (unformatted_size < 1024) {
            unit = 'B';
        } else if (unformatted_size < 1024 * 1024) {
            unit = 'KB';
            unformatted_size /= 1024;
            kb = true;
        } else if (unformatted_size < 1024 * 1024 * 1024) {
            unit = 'MB';
            kb = true;
            unformatted_size = unformatted_size / 1024 / 1024;
        } else {
            unit = 'GB';
            kb = true;
            unformatted_size = unformatted_size / 1024 / 1024 / 1024;
        }

        return {size: Number(unformatted_size.toFixed(2)), _unit: unit, gtek: kb};
    }

    /**
     * Returns true if a variable is not null, undefined or empty
     * @param foo variable to check
     */
    isNotNull(foo): boolean {
      if (foo && foo !== null && foo !== undefined && foo !== '') {
        return true;
      }
      return false;
    }

    /**
     * returns the 'data' of a response by default.
     * returns 'status' of request if @param check_status is true.
     * returns true or false if there's no 'data', 'status' or response at all (null/undefined).
     * @param response the response whose content to check.
     * @param check_status false by default. Set to true to return response status (for post/put/delete requests).
     * if the data/message is null or undefined it returns the response message.
     */
    getResponse(response: any, check_status = false, get_extra = false) {
      let response_needed = 'data';

      if (check_status) {
        response_needed = 'status';
      }

      if (this.isNotNull(response)) {
        if (this.isNotNull(response[response_needed])) {
          let resp = response[response_needed];
          if (get_extra) {
            resp = {data: resp, extra: response['extra']};
          }
          return resp;
        } else {
          if (this.isNotNull(response['message'])) {
            this.responseMessage(response['message']);
          }
          return false;
        }
      } else {
        return false;
      }
    }

    /**
     * Return objects within an array which have a particular key (passed as argument)
     * @param obj_arr array of same objects
     * @param obj_key key which to check
     * @param value_to_search value to match on
     */
    getObjectsWithKey(obj_arr: any[], obj_key: string, value_to_search): any | any[] {
      if (this.isNotNull(obj_arr) && Array.isArray(obj_arr)) {
        return obj_arr.filter(oa => {
          return oa[obj_key] === value_to_search;
        });
      }
    }

    /**
     * Update an object in an array, the object must have a unique 'id' property
     * @param arr array to replace object in
     * @param obj object to replace with
     */
    updateObjectInArray(arr, obj) {
      if (Array.isArray(arr)) {
        const item_index = arr.findIndex(item => {
          return item.id === obj.id;
        });
        arr[item_index] = obj;
        return arr;
      }
    }

    /**
     * Check if an object with a specific value exists in an array
     * @param arr array to check in
     * @param key key which to check on
     * @param value value to match on
     * returns true if the object exists
     */
    objectExistsInArray(arr: any[], key: string, value): Boolean {
      let found = false;
      if (this.isNotNull(arr) && Array.isArray(arr)) {
        arr.filter(oa => {
          if (oa[key] === value) {
            found = true;
          }
        });
      }
      return found;
    }

    /**
     * Scroll to element on page, still in development
     * @param element_id element to scroll to
     */
    scrollTo(element_id) {
      document.getElementById(element_id).scrollIntoView();
    }

    /**
     * Displays a given http error in a verbose manner
     * @param error the error of a http response
     */
    handleError(error: HttpErrorResponse) {
      console.log(error);
      if (error.error instanceof ErrorEvent) { // A client-side or network error
        console.error('An error occurred:', error.error.message);
      } else {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}, ` +
          `error message: ${error.message}, ` +
          `error Text: ${error.error.text}.`);
      }
      return throwError(error.error.message);
    }

    /**
     * Create a SearchFilter the create a HttpParam object
     * @param filter_name the filter name
     * @param filter_value the value of the filter
     */
    buildParam(filter_names: string | string[], filter_value): HttpParams {
      let ops = new HttpParams();
      if (Array.isArray(filter_names)) {
        filter_names.forEach(filter => {
          ops = ops.set(filter, filter_value.toString());
        });
      } else {
        ops = ops.set(filter_names, filter_value.toString());
      }
      return ops;
    }

    responseMessage(message) {
      console.log(message);
      // this.alert_s.errorAlert(message);
    // TODO: add argument to every method for 'reporting error' which will return error messages to calling code
    }

    /**
     * Checks if app is running in Electron environment
     */
    isElectron() {
      return (typeof process !== 'undefined') && process.versions && (process.versions.electron !== undefined);
    }
}
