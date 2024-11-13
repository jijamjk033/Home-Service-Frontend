import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './add-address.component.html',
  styleUrl: './add-address.component.css'
})
export class AddAddressComponent {
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onSave: EventEmitter<any> = new EventEmitter();
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      typeOfAddress: ['home', Validators.required],
    });
  }

  saveAddress() {
    if (this.addressForm.valid) {
      this.onSave.emit(this.addressForm.value);
      this.resetForm();
      this.closeModal();
    }
  }

  resetForm(){
    this.addressForm.reset({
      typeOfAddress: 'home',
    })
  }

  closeModal() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
