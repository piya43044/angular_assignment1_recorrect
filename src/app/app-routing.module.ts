import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path: '' , redirectTo: 'employeeList' , pathMatch: 'full'},
  {path: 'employeeList' , component: EmployeeListComponent},
  {path: 'addEmployee' , component: EmployeeAddComponent},
  {path: 'employee/:routerParamId' , component: EmployeeAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
