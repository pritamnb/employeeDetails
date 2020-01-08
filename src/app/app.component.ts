import { Component, OnInit } from '@angular/core';
import { MainService } from './shared/services/main.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  // ngModules
  name: any;
  phone: number;
  city: any;
  address1: any;
  address2: any;
  postalCode: any;
  constructor(private mainService: MainService) {
    this.mainService.getJSON().subscribe(data => {
      const employees = data.data;
      this.employeeData = data['data'];
      console.log('subscribed employee data ---:', this.employeeData.length);
      this.empLength = this.employeeData.length;
    });
  }
  ngOnInit() {
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
    this.enableEditIndex = null;
  }
  onAddEntry() {
    this.addEntry = true;
  }
  onAdd(id) {
    console.log('all Ngmodels', id, this.name, this.phone, this.city, this.address1, this.address2, this.postalCode);
    this.addEntry = false;
  }
  onCancelEntry() {
  }
}
