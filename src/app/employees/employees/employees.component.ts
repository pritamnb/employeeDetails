import { MainService } from './../../shared/services/main.service';
import { VALIDATORS } from './../../app.constant';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  EmployeeDetailsSubscription: Subscription;
  employeeData: any;
  addEntry = false;
  enableEdit = false;
  enableEditIndex = null;
  empLength: any;
  empDetailsGroup: FormGroup;
  EditEmpDetailsGroup: FormGroup;
  searchNameCity = new FormControl();
  nameCity: any; // ngmodel for searching
  // ngModules
  name: any;
  phone: number;
  obj = Object.keys;
  city: any;
  address1: any;
  address2: any;
  postalCode: any;
  column: any[];
  filteredOptions: Observable<any>;
  constructor(
    private mainService: MainService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.column = [
      {
        key: 'id',
        label: 'Id'
      },
      {
        key: 'name',
        label: 'Name'
      },
      {
        key: 'phone',
        label: 'Phone'
      },
      {
        key: 'city',
        label: 'City'
      },
      {
        key: 'address_line1',
        label: 'Address Line 1'
      },
      {
        key: 'address_line2',
        label: 'Address Line 2'
      },
      {
        key: 'postal_code',
        label: 'Postal Code'
      },
      {
        key: 'edit',
        label: 'Edit'
      },
    ];
    const CheckEmpData = this.mainService._allEmployeeDetails.subscribe((emp) => {
      console.log('subscribed', emp);
      if (emp['length'] > 0) {
        console.log('employee data exist');
        this.employeeData = emp;
      } else {
        this.mainService.getJSON().subscribe(res => {
          this.employeeData = res['data'];
          mainService.setAllEmployees(this.employeeData);
          this.employeeData.map(emp => {
            if (!parseInt(emp.phone, 10)) {
              this.employeeData[emp.id - 1].phone = 'NA';
            }
          });
        });
      }
    });


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
      ]),
      address1: new FormControl(null, [
        Validators.required,
      ]),
      address2: new FormControl(null, [
        Validators.required,
      ]),
      postalCode: new FormControl(null, [
        Validators.required,
      ]),
    });

    // edit employee details

    this.EditEmpDetailsGroup = this.fb.group({
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
      ]),
      address1: new FormControl(null, [
        Validators.required,
      ]),
      address2: new FormControl(null, [
        Validators.required,
      ]),
      postalCode: new FormControl(null, [
        Validators.required,
      ]),
    });
  }
  ngOnInit() {
  }


  enableEditMethod(e, i) {
    // this.enableEdit = true;
    // this.enableEditIndex = i;
    // if (this.addEntry === true) {
    //   this.addEntry = false;
    // }
    // this.router.navigate(['/employees', i + 1, 'edit']);
  }

  cancelEdit() {
    this.enableEditIndex = null;
  }

  saveSegment(id, name, phone, city, address1, address2, postal_code) {
    const list = this.employeeData.map((emp) => emp.id === id);
    this.enableEditIndex = null;


  }
  onAddEntryButton() {
    this.router.navigate(['/add']);
    // this.addEntry = true;
    // if (this.addEntry === true) {
    //   this.enableEditIndex = null;

    // }
    // this.empLength = this.employeeData.length;

  }
  onAdd(id) {
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
    this.empDetailsGroup.reset();
    this.empLength = this.employeeData.length;

  }
  onCancelEntry() {
    this.addEntry = false;
  }
  onKeyPress() {
    // defunctioning edit and add while searching
    this.addEntry = false;
    this.enableEditIndex = null;
  }


}
