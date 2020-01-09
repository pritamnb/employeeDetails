import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';

@Pipe({
  name: 'searchFilter',
  pure: false
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any): any {
    let search;
    console.log('in search filter', value, 'arguments', args);
    // if (!value) { return []; }
    // if (!args) { return value; }
    if (value) {
      console.log('in value');
      const filteredCountryName = value.filter(emp =>
        emp.name.toLowerCase().indexOf(args) === 0 ||
        emp.address.city.toLowerCase().indexOf(args) === 0);
      search = filteredCountryName.map(emp => emp);
      console.log('filteredCityName', search);
    }
    return search;
  }

}
