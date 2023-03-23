import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {


  private baseUrl: string = "http://localhost:3000/list";

  constructor(private http : HttpClient){};

  // Post the data of employees in the server
  postEmployees(empObj : Employee){
    return this.http.post<Employee>(`${this.baseUrl}` , empObj);
  }

  // Get the employee data from the server
  getRegisterEmployees(){
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  // Update the employee data in the server
  updateEmployees(empObj: Employee, id: number){
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, empObj);
  }

  // Delete the data of the employee in the server
  deleteEmployee(id : number){
    return this.http.delete<Employee>(`${this.baseUrl}/${id}`);
  }

  // Get the single employee data with their json id from the server
  getEmployeeById(id : number){
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }
}
