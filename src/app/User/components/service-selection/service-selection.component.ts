import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../../common/components/table/table.component';
import { NgFor } from '@angular/common';
import { AboutServiceComponent } from '../booking-process/about-service/about-service.component';
import { AddressManagementComponent } from '../booking-process/address-management/address-management.component';
import { EmployeeSelectionComponent } from '../booking-process/employee-selection/employee-selection.component';
import { RelatedServicesComponent } from '../booking-process/related-services/related-services.component';
import { ActivatedRoute} from '@angular/router';
import { ServicesService } from '../../../Admin/services/services.service';

@Component({
  selector: 'app-service-selection',
  standalone: true,
  imports: [TableComponent, NgFor, AboutServiceComponent, AddressManagementComponent, EmployeeSelectionComponent, RelatedServicesComponent],
  templateUrl: './service-selection.component.html',
  styleUrl: './service-selection.component.css'
})
export class ServiceSelectionComponent implements OnInit {
  serviceId:string = '';
  serviceDescription:string ='';
  
  constructor(private route: ActivatedRoute, private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const service = response.data[0];
          this.serviceDescription = service.description;
        } else {
          console.error('No service data found');
        }
      },
      error: (err) => {
        console.error('Error fetching service', err);
      }
    });
  }
}
