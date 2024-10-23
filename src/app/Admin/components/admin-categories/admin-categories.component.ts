import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../../common/components/card/card.component';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [RouterModule,NgFor,CardComponent],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit{
pageTitle = 'Categories';
categories: any[] = []; 

@Input() title!: string;

constructor(private categoryService:CategoryService,private router:Router){}

ngOnInit(): void {
  this.fetchCategories(); 
}

fetchCategories(): void {
  this.categoryService.getCategories().subscribe({
    next: (response) => {
      this.categories = response.data; 
    },
    error: (error) => {
      console.error('Error fetching categories', error);
    }
  });
}


onDeleteCategory(id: string): void {
  this.categoryService.deleteCategory(id).subscribe({
    next: () => {
      this.fetchCategories();
    },
    error: (error) => {
      console.error('Error deleting category', error);
    }
  });
}

onEditCategory(id: string): void {
  this.router.navigate([`/adminHome/edit-category`, id]);
}

}
