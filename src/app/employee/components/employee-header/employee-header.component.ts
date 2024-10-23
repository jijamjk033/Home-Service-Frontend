import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employeeService.service';

@Component({
  selector: 'app-employee-header',
  standalone: true,
  imports: [RouterModule,NgIf],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent {
  isLoggedIn = false;

  constructor(private employeeService: EmployeeService){}

  ngOnInit(): void {
    this.employeeService.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.employeeService.logout();
  }

}
