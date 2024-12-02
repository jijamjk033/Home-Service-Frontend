import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../../../Admin/services/services.service';
import { IService } from '../../models/serviceModel';
import { EmployeeSelectedComponent } from '../employee-selected/employee-selected.component';
import { CategoryService } from '../../../Admin/services/category.service';
import { EmployeeSelectionComponent } from '../employee-selection/employee-selection.component';
import { setServiceId } from '../../../state/booking/booking.actions';
import { Store } from '@ngrx/store';
import { BookingState } from '../../../state/booking/booking.state';

@Component({
  selector: 'app-service-selection',
  standalone: true,
  imports: [NgIf, NgFor, EmployeeSelectionComponent, EmployeeSelectedComponent],
  templateUrl: './service-selection.component.html',
  styleUrl: './service-selection.component.css'
})
export class ServiceSelectionComponent implements OnInit {
  serviceId: string = '';
  service: IService | null = null;
  categoryId: string = '';
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private serviceService: ServicesService,
    private categoryService: CategoryService,
    private store: Store<BookingState>
  ) { }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(setServiceId({ serviceId: this.serviceId }));
    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (response) => {
        if (response.data && typeof response.data === 'object') {
          this.service = response.data as IService;
          this.categoryId = this.service.category;

          this.categoryService.getCategoryById(this.categoryId).subscribe({
            next: (categoryResponse) => {
              this.categoryName = categoryResponse.data.name;
            },
            error: (err) => {
              console.error('Error fetching category', err);
            }
          });

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
