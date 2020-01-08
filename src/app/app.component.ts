import { Component, OnInit } from '@angular/core';
import { MainService } from './shared/services/main.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs';
import { VALIDATORS } from './app.constant';

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
  empDetailsGroup: FormGroup;
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
  constructor(
    private mainService: MainService,
    private fb: FormBuilder
  ) {
    this.mainService.getJSON().subscribe(data => {
      this.employeeData = data['data'];
      console.log('subscribed employee data ---:', this.employeeData);
      this.filteredOptions = this.employeeData;
      this.empLength = this.filteredOptions['length'];
      // form builder
      this.empDetailsGroup = this.fb.group({
        name: new FormControl(null, [
          Validators.required,
          Validators.pattern(VALIDATORS.NAME)
        ]),
        phone: new FormControl(null, [
          Validators.required,
          Validators.pattern(VALIDATORS.PHONE)
        ]),
        city: new FormControl(null, [
          Validators.required,
          Validators.pattern(VALIDATORS.CITY)
        ]),
        address1: new FormControl(null, [
          Validators.required,
          Validators.pattern(VALIDATORS.ADDRESS)
        ]),
        address2: new FormControl(null, [
          Validators.required,
          Validators.pattern(VALIDATORS.ADDRESS)
        ]),
        postalCode: new FormControl(null, [
          Validators.required,
          Validators.pattern(VALIDATORS.POSTAL_CODE)
        ]),
      });
    });
    // search by name or city using form group
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
    console.log('Add entry pressed');
    this.addEntry = true;
    if (this.addEntry === true) {
      this.cancel();
    }
    this.empLength = this.filteredOptions['length'];
  }
  onAdd(id) {
    console.log('FORM VALUES', this.empDetailsGroup.value);
    this.employeeData.push({
      id,
      name: this.empDetailsGroup.value.name,
      phone: this.empDetailsGroup.value.phone,
      address: {
        city: this.empDetailsGroup.value.city,
        address_line1: this.empDetailsGroup.value.address1,
        address_line2: this.empDetailsGroup.value.address2,
        postal_code: this.empDetailsGroup.value.postalCode
      }
    });
    this.addEntry = false;
    this.empLength = this.filteredOptions['length'];
    this.empDetailsGroup.reset();
  }
  onCancelEntry() {
    this.addEntry = false;
  }

}
