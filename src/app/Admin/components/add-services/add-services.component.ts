import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-add-services',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-services.component.html',
  styleUrl: './add-services.component.css'
})
export class AddServicesComponent implements OnInit {
  pageTitle = 'Add Service';
  uploadedImageFile!: File | null;
  uploadedImageUrl: string | null = null;
  errorMessage: string | null = null;
  categoryId: string = '';
  categoryName:string = '';
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  serviceForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private service:ServicesService, 
    private categoryService: CategoryService,
    private toastr: ToastrService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      price: ['', Validators.required],
      description:[''],
      serviceImage: [null],
    });
    this.categoryId = this.route.snapshot.paramMap.get('id')!;

    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        const category = response.data;
        this.categoryName = category.name;
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
        this.serviceForm.patchValue({
          serviceImage: this.uploadedImageFile
        });
      } else {
        this.errorMessage = 'Invalid file type. Only JPEG, PNG, JPG, and WebP formats are allowed.';
        this.uploadedImageUrl = null;
      }
    }
  }

  onSubmit(): void {

    if (this.serviceForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('serviceName', this.serviceForm.get('serviceName')?.value);
    formData.append('price', this.serviceForm.get('price')?.value);
    formData.append('description', this.serviceForm.get('description')?.value);
    formData.append('categoryId', this.categoryId);
    if (this.uploadedImageFile) {
      formData.append('image', this.uploadedImageFile);
    } else if(this.uploadedImageUrl) {
      formData.append('imageUrl', this.uploadedImageUrl);
    }
    this.service.addService(formData).subscribe({
      next: (response) => {
        this.toastr.success('Service added successfully', 'Success');

        this.router.navigate(['/adminHome/services/',this.categoryId]);
      },
      error: (error) => {
        if (error.error && error.error.message === 'Service already exists') {
          alert('This service already exists');
        } else {
          this.toastr.error('Failed to add service', 'Error');
        }
      }
    });
  }

  onCancel(): void {
    this.serviceForm.reset();
    this.uploadedImageUrl = null;
  }
}
