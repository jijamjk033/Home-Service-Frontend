import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-admin-add-category',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './admin-add-category.component.html',
  styleUrl: './admin-add-category.component.css'
})
export class AdminAddCategoryComponent implements OnInit {

  pageTitle = 'Add Category';
  loading: boolean = false; 
  categoryForm!: FormGroup;
  uploadedImageFile!: File | null;
  uploadedImageUrl: string | null = null;  
  errorMessage: string | null = null; 
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  constructor(private fb: FormBuilder, private categoryService: CategoryService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: [null],
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
      }else{
        this.errorMessage = 'Invalid file type. Only JPEG, PNG, JPG, and WebP formats are allowed.';
        this.uploadedImageUrl = null; 
      }
    }
  }

  onSubmit(): void {

    if (this.categoryForm.invalid || !this.uploadedImageFile) {
      return;
    }
    this.loading = true;
    const formData = new FormData();
    formData.append('categoryName', this.categoryForm.get('categoryName')?.value);
    formData.append('image', this.uploadedImageFile);
    this.categoryService.addCategory(formData).subscribe({
      next: (response) => {
        this.toastr.success('Category added successfully', 'Success');
        
        this.router.navigate(['/adminHome/categories']);
        this.loading = false; 
      },
      error: (error) => {
        this.loading = false;
        if (error.error && error.error.message === 'Category already exists') {
          alert('This category already exists');
        } else {
          this.toastr.error('Failed to add category', 'Error');
        }
      }
    });
  }

  onCancel(): void {
    this.categoryForm.reset();
    this.uploadedImageUrl = null;
  }

}