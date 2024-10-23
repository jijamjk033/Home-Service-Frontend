import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Init } from 'v8';
import { NgIf } from '@angular/common';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-edit-category',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './admin-edit-category.component.html',
  styleUrl: './admin-edit-category.component.css'
})
export class AdminEditCategoryComponent implements OnInit {

  pageTitle = 'Edit Category';

  categoryForm!: FormGroup;
  uploadedImageFile!: File | null;
  uploadedImageUrl: string | null = null;
  errorMessage: string | null = null;
  categoryId: string = '';
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: [''],
    });

    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        const category = response.data;
        this.categoryForm.patchValue({
          categoryName: category.name,
          categoryImage: category.image,
        });
        this.uploadedImageUrl = category.image;
      },
      error: (err) => {
        console.error('Error fetching category', err);
      }
    });
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.allowedFileTypes.includes(file.type)) {
        this.errorMessage = null;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImageUrl = e.target.result;
        };
        reader.readAsDataURL(file);

        this.uploadedImageFile = file;
        this.categoryForm.patchValue({
          categoryImage: this.uploadedImageFile
        });
      } else {
        this.errorMessage = 'Invalid file type. Only JPEG, PNG, JPG, and WebP formats are allowed.';
        this.uploadedImageUrl = null;
      }
    }
  }

  onSubmit(): void {
    if (this.categoryForm.invalid || !this.uploadedImageFile) {
      return;
    }
    const updatedCategory = new FormData();
    updatedCategory.append('categoryName', this.categoryForm.get('categoryName')?.value);
    updatedCategory.append('image', this.uploadedImageFile);

    this.categoryService.updateCategory(this.categoryId, updatedCategory).subscribe({
      next: () => {
        this.router.navigate(['/adminHome/categories']);
      },
      error: (err) => {
        console.error('Error updating category', err);
      }
    });

  }

  onCancel(): void {
    this.router.navigate(['/adminHome/categories']);
  }
}
