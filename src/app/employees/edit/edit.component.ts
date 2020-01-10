import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { VALIDATORS } from '../../app.constant';
import { MainService } from 'src/app/shared/services/main.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  paramId: any;
  toEdit: any;
  // form Group
  empDetailsGroup: FormGroup;
  employees: any;
  constructor(
    private fb: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef
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

    this.empDetailsGroup.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }


  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(res => {
      this.paramId = parseInt(res['params'].id, 10);
    });

    this.mainService._allEmployeeDetails.subscribe((emp) => {
      this.employees = emp;
      console.log(this.employees);
      emp.map(employee => {
        if (employee.id === this.paramId) {
          console.log('related to param', employee);
          this.toEdit = employee;
        }
      });
      console.log('to edit employees', this.employees);
    });
    this.empDetailsGroup.setValue({
      name: this.toEdit.name,
      phone: this.toEdit.phone,
      city: this.toEdit.address.city,
      address1: this.toEdit.address.address_line1,
      address2: this.toEdit.address.address_line2,
      postalCode: this.toEdit.address.postal_code,
    }
    );
  }
  onCancelEntry() {
    this.router.navigate(['employees']);
  }
  onEditEntry() {
    console.log(this.empDetailsGroup.value);
    this.employees.map(emp => {
      if (emp.id === this.paramId) {
        emp.name = this.empDetailsGroup.value.name,
          emp.phone = this.empDetailsGroup.value.phone,
          emp.address.city = this.empDetailsGroup.value.city,
          emp.address.address_line1 = this.empDetailsGroup.value.address1,
          emp.address.address_line2 = this.empDetailsGroup.value.address2,
          emp.address.postal_code = this.empDetailsGroup.value.postalCode;
      }
    });
    console.log(this.employees);

    this.mainService.setAllEmployees(this.employees);
    this.empDetailsGroup.reset();
    this.router.navigate(['employees']);

  }
}
