import { Component, OnInit } from '@angular/core';
import { MainService } from './shared/services/main.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employeeData: any;
  addEntry = false;
  enableEdit = false;
  enableEditIndex = null;
  empLength: any;
  searchNameCity = new FormControl();
  nameCity: any; // ngmodel for searching
  // ngModules
  name: any;
  phone: number;
  city: any;
  address1: any;
  address2: any;
  postalCode: any;
  filteredOptions: Observable<any>;
  constructor(private mainService: MainService) {
    this.mainService.getJSON().subscribe(data => {
      const employees = data.data;
      this.employeeData = data['data'];
      console.log('subscribed employee data ---:', this.employeeData);
      this.filteredOptions = this.employeeData;
      this.empLength = this.filteredOptions['length'];

    });
    this.searchNameCity.valueChanges.subscribe((res) => {
      this.filteredOptions = this._filter(res);
      console.log('====================================');
      console.log(this.filteredOptions);
      console.log('====================================');
    });

  }
  ngOnInit() {

  }

  private _filter(value: string) {
    console.log('value', value);
    const filterValue = value.toLowerCase();

    // tslint:disable-next-line: max-line-length
    const filteredCountryName = this.employeeData.filter(emp => emp.name.toLowerCase().indexOf(filterValue) === 0 || emp.address.city.toLowerCase().indexOf(filterValue) === 0);
    // console.log('filteredCountryName', filteredCountryName.map(emp => emp));
    // this.employeeData = filteredCountryName.map(emp => emp);
    return filteredCountryName.map(emp => emp);

  }
  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

  cancel() {
    console.log('cancel');
    this.enableEditIndex = null;

  }

  saveSegment(id, name, phone, city, address1, address2, postal_code) {
    console.log('changed', id, name, phone, city, address1, address2, postal_code);
    const list = this.employeeData.map((emp) => emp.id === id);
    this.enableEditIndex = null;
    // console.log(list);

  }
  onAddEntry() {
    this.addEntry = true;
    this.empLength = this.filteredOptions['length'];

  }
  onAdd(id) {
    console.log('all Ngmodels', id, this.name, this.phone, this.city, this.address1, this.address2, this.postalCode);
    this.employeeData.push({
      id,
      name: this.name,
      phone: this.phone,
      address: {
        city: this.city,
        address_line1: this.address1,
        address_line2: this.address2,
        postal_code: this.postalCode
      }
    });
    this.addEntry = false;
    this.empLength = this.filteredOptions['length'];

  }
  onCancelEntry() {
    this.addEntry = false;

  }
}
