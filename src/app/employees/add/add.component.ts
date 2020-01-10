import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VALIDATORS } from '../../app.constant';
import { MainService } from 'src/app/shared/services/main.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  // form Group
  empDetailsGroup: FormGroup;
  employees: any;
  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private router: Router
  ) {
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
    this.employees = [];
    // getting employees data
    this.mainService._allEmployeeDetails.subscribe((emp) => {
      this.employees = emp;
      console.log('Esisting employees', this.employees);
    });
  }

  ngOnInit() {
  }
  onCancelEntry() {
    console.log('On cancel new Entry');
    // this.addEntry = false;
    this.router.navigate(['employees']);
  }
  onAddEntry() {
    console.log(this.empDetailsGroup.value);
    this.employees.push({
      id: this.employees['length'] + 1,
      name: this.empDetailsGroup.value.name,
      phone: this.empDetailsGroup.value.phone,
      address: {
        city: this.empDetailsGroup.value.city,
        address_line1: this.empDetailsGroup.value.address1,
        address_line2: this.empDetailsGroup.value.address2,
        postal_code: this.empDetailsGroup.value.postalCode
      }
    });
    this.mainService.setAllEmployees(this.employees);
    this.empDetailsGroup.reset();
    this.router.navigate(['employees']);

  }
}
