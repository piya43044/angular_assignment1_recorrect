import { Component } from '@angular/core';
import { DialogService } from './services/dialog.service';
import { EmployeeDetailsService } from './services/employee-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EmployeeDetailsService ,DialogService]
})
export class AppComponent {
  title = 'angular-employee';

  constructor(private employeesDetaialService : EmployeeDetailsService){}
}
