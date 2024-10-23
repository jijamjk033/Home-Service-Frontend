import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../Admin/services/category.service';
import { ServicesService } from '../../../Admin/services/services.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-services-provided',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './services-provided.component.html',
  styleUrl: './services-provided.component.css'
})
export class ServicesProvidedComponent implements OnInit {
  categoryName: string = '';
  categoryId: string = '';
  services: any[] = [];

  constructor(private route: ActivatedRoute, private categoryService: CategoryService,private serviceService: ServicesService,private router: Router) { }

  ngOnInit(): void{
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

}
