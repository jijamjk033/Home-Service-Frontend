import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../Admin/services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor,RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: any[] = [];
  pageTitle = 'Services';

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Error fetching categories:', error.message || error);
      }
    });
  }

}
