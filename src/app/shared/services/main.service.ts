import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private allEmployeesDataSource = new BehaviorSubject({});
  _allEmployees$ = this.allEmployeesDataSource.asObservable();

  constructor(private http: HttpClient) {
    // this.getJSON().subscribe(res => {
    //   console.log('service called')
    //   this.setAllEmployees(res['data']);
    // });
    // this.setAllEmployees();
  }
  public getJSON(): Observable<any> {
    return this.http.get('../assets/json/employess.json');
  }
  setAllEmployees(data) {
    // console.log('setting up employees', data);
    this.allEmployeesDataSource.next(data);
  }
}
