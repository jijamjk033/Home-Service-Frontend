import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-services',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './edit-services.component.html',
  styleUrl: './edit-services.component.css'
})
export class EditServicesComponent {
  pageTitle = 'Edit Service';
  uploadedImageFile!: File | null;
  uploadedImageUrl: string | null = null;
  errorMessage: string | null = null;
  serviceId: string = '';
  categoryId: string = '';
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];

  serviceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceService: ServicesService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      price: ['', Validators.required],
      description: [''],
      serviceImage: [null],
    });

    this.serviceId = this.route.snapshot.paramMap.get('id')!;
    this.serviceService.getServiceById(this.serviceId).subscribe({
      next: (response) => {
        const service = response.data;
        this.serviceForm.patchValue({
          serviceName: service.name,
          price: service.price,
          description: service.description,
        });
        this.uploadedImageUrl = service.image;
        this.categoryId = service.category;
      },
      error: (err) => {
        console.error('Error fetching service', err);
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
    } else if (this.uploadedImageUrl) {
      formData.append('imageUrl', this.uploadedImageUrl);
    }
    this.serviceService.updateService(this.serviceId, formData).subscribe({
      next: (response) => {
        this.toastr.success('Service updated successfully', 'Success');
        this.router.navigate(['/adminHome/services/', this.categoryId]);
      },
      error: (error) => {
        this.toastr.error('Failed to update service', 'Error');
      }
    });
  }
  

  onCancel(): void {
    this.serviceForm.reset();
    this.uploadedImageUrl = null;
  }
}
