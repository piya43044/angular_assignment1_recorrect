import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeDetailsService } from '../services/employee-details.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit{
  
  addEmployeeForm!: FormGroup;
  experienceYears : string[] = ['1years', '2years', '3years' ,'4years'];
  employeeIdToEdit !: number;
  isEditActive: Boolean =false;

  constructor(private employeesDetailService : EmployeeDetailsService, 
    private activatedRoute : ActivatedRoute,
    private router: Router){};

  // OnInit method
  ngOnInit(){
    
    // Create Form for add Employees Detail
    this.addEmployeeForm = new FormGroup({
      empId : new FormControl('',[Validators.required]),
      name : new FormControl('',[Validators.required, Validators.minLength(3)]),
      contact : new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      skillsAndExperience : new FormArray([this.skillsAndExperienceForm()]),
      gender : new FormControl('', Validators.required),
    })

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.employeeIdToEdit = param['routerParamId'];

      this.employeesDetailService.getEmployeeById(this.employeeIdToEdit).subscribe((empData) =>{
        this.isEditActive=true;
        this.fillFormToEdit(empData);
        // console.log(empData);
      })
    })
  }
  
  // Add Skill and Experience Formgroup in Add Employee Form
  skillsAndExperienceForm(){
    return new FormGroup({
      skills : new FormControl('', Validators.required),
      experience : new FormControl('', Validators.required)
    })
  }


  // getter method of form control in addEmployeeForm 
  get empId(){
    return this.addEmployeeForm.get('empId');
  }
  get name(){
    return this.addEmployeeForm.get('name');
  }
  get contact(){
    return this.addEmployeeForm.get('contact');
  }
  get email(){
    return this.addEmployeeForm.get('email');
  }
  get gender(){
    return this.addEmployeeForm.get('gender');
  }

  // getter of dyanamic create skill and experience
  get skillsAndExperience(){
    return this.addEmployeeForm.get('skillsAndExperience') as FormArray;
  }

  // Add Skill Dynamically
  addSkillsAndExperience(){
    this.skillsAndExperience.push(this.skillsAndExperienceForm());
  }

  // Delete Skills and Experiene
  deleteSkillsAndExperience(i : Required<number>){
    this.skillsAndExperience.removeAt(i);
  }

  // Submit Form Method
  onSubmit(){
    // console.log(this.addEmployeeForm.value);
    this.employeesDetailService.postEmployees(this.addEmployeeForm.value).subscribe( (response) =>{
      this.addEmployeeForm.reset();
      this.skillsAndExperience.clear();
      this.addSkillsAndExperience();
      this.router.navigate(['employeeList']);
    })
  }

  // Edit button method
  onEdit(){
    this.employeesDetailService.updateEmployees(this.addEmployeeForm.value, this.employeeIdToEdit).subscribe( (response) =>{
      this.addEmployeeForm.reset();
      this.skillsAndExperience.clear();
      this.addSkillsAndExperience();
      this.router.navigate(['employeeList']);
    })
  }

  // Edit Employee Ditails

  fillFormToEdit(employee : Employee){

    const skillsExp = employee.skillsAndExperience;
    // console.log(skillsExp);
    this.skillsAndExperience.clear();
    
    // Add all Skills and experience in the edit form
    skillsExp.forEach(element => {
      this.addSkillsAndExperience();
    });
    
    // set the value of all the fields of edit form
    this.addEmployeeForm.patchValue({
      empId : employee.empId,
      name : employee.name,
      contact : employee.contact,
      email : employee.email,
      gender : employee.gender,
      skillsAndExperience : skillsExp
    })
    
  }


}
