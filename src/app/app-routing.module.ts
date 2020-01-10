import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees/employees/employees.component';
import { AddComponent } from './employees/add/add.component';
import { EditComponent } from './employees/edit/edit.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees' },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'employees/add',
    pathMatch: 'full',
    component: AddComponent,
  },
  {
    path: 'employees/:id/edit',
    component: EditComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
