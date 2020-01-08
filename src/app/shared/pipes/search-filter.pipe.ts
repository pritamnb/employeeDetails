import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    console.log('in search filter', value, args);
    if (!value) { return []; }
    if (!args) { return value; }

    const filterValue = value;

    const filteredCountryName = filterValue.filter(emp => emp.name.toLowerCase().indexOf(args) === 0);
    const search = filteredCountryName.map(emp => emp);
    console.log('filteredCityName', filteredCountryName.map(emp => emp.name), search);
    return search;
  }

}
