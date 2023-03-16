import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { DialogService } from '../services/dialog.service';
import { EmployeeDetailsService } from '../services/employee-details.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employee !:Employee[];
  showSuccess : boolean = false;
  successMessage !: string;

  constructor(private employeesDetailService : EmployeeDetailsService, 
    private router : Router,
    private dialogService: DialogService){};
  
  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(){
    this.employeesDetailService.getRegisterEmployees().subscribe( data =>{
      this.employee = data;
      // console.log(data)
    })
  }

  edit(index : number){
    this.router.navigate(['employee', index])
  }

  delete(index : number, empName: string){
    
    // Confirm Dialog box display for delete employee
    
    this.dialogService.openConfirmDialog(`Are you sure you want to delete ${empName}?`)
    .afterClosed().subscribe(res=>{
      // console.log(res);
      if(res){
        
        this.employeesDetailService.deleteEmployee(index).subscribe((data) =>{
          //   console.log(data);
          this.showSuccess = true;
          this.successMessage = `The Employee ${empName}is deleted successfully.`;
          setTimeout(() => {
            this.showSuccess = false;
            this.successMessage = '';
            this.ngOnInit();
          }, 2000);
          })
      }
    });
  }

}
