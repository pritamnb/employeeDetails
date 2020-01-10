import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any): any {
    let search;
    if (value) {
      // applied a filter which will check entered letter in a whole string

      // if we need to search from the begining of the string we should use indexOf(args) === 0


      const filteredCountryName = value.filter(emp =>
        emp.name.toLowerCase().includes(args) ||
        emp.address.city.toLowerCase().includes(args));
      search = filteredCountryName.map(emp => emp);
    }
    return search;
  }

}
