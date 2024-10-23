import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [RouterModule, NgIf,NgFor],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.css'
})
export class AdminServicesComponent implements OnInit{
  pageTitle = 'Services';
  categoryName: string = '';
  categoryId: string = '';
  services: any[] = [];
  constructor(private route: ActivatedRoute, private categoryService: CategoryService,private serviceService: ServicesService,private router: Router) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        const category = response.data;
        this.categoryName = category.name;
      },
      error: (err) => {
        console.error('Error fetching category', err);
      }
    });
    this.loadServices(this.categoryId);
  }

  loadServices(categoryId: string): void {
    this.serviceService.getServicesByCategory(categoryId).subscribe((response: any) => {
      this.services = response.data;
    });
  }

  onDelete(serviceId: string): void {
    this.serviceService.deleteService(serviceId).subscribe({
      next: () => {
        this.loadServices(this.categoryId);
      },
      error: (error) => {
        console.error('Error deleting category', error);
      }
    });
  }

  onEdit(serviceId: string): void {
    this.router.navigate([`/adminHome/edit-service`, serviceId]);
  }
}

