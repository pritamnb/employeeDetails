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
      if (emp['length'] > 0) {
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


  onCancelEntry() {
    this.addEntry = false;
  }


}
