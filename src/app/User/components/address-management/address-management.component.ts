import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddAddressComponent } from '../add-address/add-address.component';
import { catchError, of } from 'rxjs';
import { NgFor } from '@angular/common';
import { userService } from '../../services/userService';
import { Address } from '../../models/address';

@Component({
  selector: 'app-address-management',
  standalone: true,
  imports: [AddAddressComponent, NgFor],
  templateUrl: './address-management.component.html',
  styleUrl: './address-management.component.css'
})

export class AddressManagementComponent implements OnInit {
  addresses: Address[] = [];
  selectedAddressId: string = '';
  isModalVisible: boolean = false;
  userId: string = '';

  @Output() addressSelected = new EventEmitter<string>();

  constructor(private userService: userService) { }

  ngOnInit() {
    this.loadAddresses();
  }

  openModal() {
    this.isModalVisible = true;
  }

  loadAddresses() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.userId = localStorage.getItem('user_id') || '';

      if (this.userId) {
        this.userService.getAddresses(this.userId).subscribe(
          (response) => {
            if (response && response.data) {
              this.addresses = response.data;
            } else {
              console.error('Error: No address data received');
            }
          },
          (error) => {
            console.error('Error fetching Address:', error);
          }
        );
      } else {
        console.error('No user ID found in localStorage');
      }
    } 
  }



  handleAddressSave(newAddress: Address) {
    const addressData = { ...newAddress, user: this.userId };
    this.userService.addAddress(addressData).pipe(
      catchError(error => {
        console.error('Error saving address:', error);
        alert('Failed to save address. Please try again.');
        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log('Address saved successfully:', response);
        alert('Address saved successfully!');
        this.loadAddresses();
      }
    });
  }

  onSelectAddress(addressId: string) {
    this.selectedAddressId = addressId;
    this.addressSelected.emit(this.selectedAddressId);
  }
}