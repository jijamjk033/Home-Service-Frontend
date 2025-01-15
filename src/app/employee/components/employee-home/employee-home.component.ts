import { Component } from '@angular/core';
import { EmployeeHeaderComponent } from '../employee-header/employee-header.component';
import { EmployeeSidebarComponent } from '../employee-sidebar/employee-sidebar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-home',
  standalone: true,
  imports: [NgIf, EmployeeHeaderComponent,EmployeeSidebarComponent,RouterModule],
  templateUrl: './employee-home.component.html',
  styleUrl: './employee-home.component.css'
})
export class EmployeeHomeComponent {
  routerOutletActive = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const activeRoute = this.activatedRoute.firstChild;
    this.routerOutletActive = !!activeRoute; 
  }
  onActivate() {
    this.routerOutletActive = true;
  }
}
