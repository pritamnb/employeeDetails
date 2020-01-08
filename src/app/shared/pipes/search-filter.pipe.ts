import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    console.log('in search filter', value, 'arguments', args);
    if (!value) { return []; }
    if (!args) { return value; }
    const filteredCountryName = value.filter(emp =>
      emp.name.toLowerCase().indexOf(args) === 0 ||
      emp.address.city.toLowerCase().indexOf(args) === 0);
    const search = filteredCountryName.map(emp => emp);
    console.log('filteredCityName', search);
    return search;
  }

}
