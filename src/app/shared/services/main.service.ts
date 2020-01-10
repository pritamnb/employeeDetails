import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {
  private allEmployeeDetailsDataSource = new BehaviorSubject([]);
  _allEmployeeDetails = this.allEmployeeDetailsDataSource.asObservable();
  constructor(private http: HttpClient) {
  }
  public getJSON(): Observable<any> {
    return this.http.get('../assets/json/employess.json');
  }
  setAllEmployees(data) {
    console.log(data);
    this.allEmployeeDetailsDataSource.next(data);
  }
}
