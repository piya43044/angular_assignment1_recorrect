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

  // Get the data from the json server
  getEmployee(){
    this.employeesDetailService.getRegisterEmployees().subscribe( data =>{
      this.employee = data;
      // console.log(data)
    })
  }

  // Navigate the router for editing the data in json server
  edit(index : number){
    this.router.navigate(['employee', index])
  }

  // Delete the data from the json server
  delete(index : number, empName: string){
    
    // Confirm Dialog box display for delete employee
    this.dialogService.openConfirmDialog(`Are you sure you want to delete ${empName}?`)
    .afterClosed().subscribe(res=>{
      
      // Check the response of dialog box, if it give yes then delete the data and show the message
      if(res){  
        this.employeesDetailService.deleteEmployee(index).subscribe((data) =>{
          //   console.log(data);
          this.showSuccess = true;
          this.successMessage = `The Employee ${empName}is deleted successfully.`;
          this.getEmployee();

          // setTimeout() is used for holding the message for 2 seconds
          setTimeout(() => {
            this.showSuccess = false;
            this.successMessage = '';
          }, 2000);
        })
      }
    });
  }

}
