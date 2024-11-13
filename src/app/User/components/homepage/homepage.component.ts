import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../Admin/services/category.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent,FooterComponent,RouterModule,NgFor,],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  categories: any[] = [];

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
