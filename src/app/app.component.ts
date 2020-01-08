import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MainService } from './shared/services/main.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VALIDATORS } from './app.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  EmployeeDetailsSubscription: Subscription;
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
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef
  ) {
    this.mainService.getJSON().subscribe(res => {
      console.log('service called');
      // this.mainService.setAllEmployees(res['data']);
      this.employeeData = res['data'];
      this.filteredOptions = this.employeeData;
    });
    // this.mainService._allEmployees$.subscribe(res => {
    //   console.log('subscriber', res);
    //   this.employeeData = res;
    //   console.log('After subscribed', this.employeeData);
    //   this.changeDetector.detectChanges();
    // }
    // );

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


  }
  ngOnInit() {
  }


  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    if (this.addEntry === true) {
      this.addEntry = false;
    }
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
    // if (this.addEntry === true) {
    //   this.cancel();
    // }
    this.empLength = this.employeeData.length;
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
    this.filteredOptions = this.employeeData;
    console.log('added employee', this.filteredOptions);
    // this.mainService.setAllEmployees(this.employeeData);
    this.empLength = this.employeeData.length;
    this.empLength = this.filteredOptions['length'];

    // this.empDetailsGroup.reset();
  }
  onCancelEntry() {
    this.addEntry = false;
  }
  ngOnDestroy() {
    if (this.EmployeeDetailsSubscription) {
      this.EmployeeDetailsSubscription.unsubscribe();
    }
  }

}
