import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {


  private baseUrl: string = "http://localhost:3000/list";

  constructor(private http : HttpClient){};

  // Posting the request
  postEmployees(empObj : Employee){
    return this.http.post<Employee>(`${this.baseUrl}` , empObj);
  }

  // Get the request
  getRegisterEmployees(){
    return this.http.get<Employee[]>(`${this.baseUrl}`);
  }

  

  // Update request
  updateEmployees(empObj: Employee, id: number){
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, empObj);
  }

  // Delete request
  deleteEmployee(id : number){
    return this.http.delete<Employee>(`${this.baseUrl}/${id}`);
  }

  // Get single employee id
  getEmployeeById(id : number){
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }
}
