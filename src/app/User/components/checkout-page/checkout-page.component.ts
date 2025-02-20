import { Component, NgZone, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookingState } from '../../../state/booking/booking.state';
import { setAddress } from '../../../state/booking/booking.actions';
import { AddressManagementComponent } from '../address-management/address-management.component';
import { first, Observable } from 'rxjs';
import { selectAddress, selectEmployeeId, selectServiceId, selectTimeSlotId } from '../../../state/booking/booking.selectors';
import { IService } from '../../models/serviceModel';
import { ServicesService } from '../../../Admin/services/services.service';
import { CategoryService } from '../../../Admin/services/category.service';
import { EmployeeService } from '../../../employee/services/employeeService.service';
import { EmployeeModel } from '../../models/employeeModel';
import { userService } from '../../services/userService';
import { ITimeslot } from '../../models/timeSlot';
import { Address } from '../../models/address';
import { DatePipe, NgIf } from '@angular/common';
import { IBookingData, PaymentDetails, PaymentResponse } from '../../models/bookingInterface';
import { Router } from '@angular/router';
declare var Razorpay: any;
@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [AddressManagementComponent, NgIf, DatePipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent implements OnInit {
  selectedAddress: string = '';
  serviceId: string | null = null;
  address: string | null = null;
  timeslot: string | null = null;
  employeeId: string | null = null;
  service: IService | null = null;
  servicePrice: number = 0;
  categoryId: string = '';
  categoryName: string = '';
  selectedPaymentMode: string | null = null;
  employeeDetails: EmployeeModel = {
    name: '',
    phone: '',
    email: '',
    role: '',
    status: '',
    yearsOfExperience: 0 ,
    is_verified: false,
    _id: '',
    rating: 0
  };
  timeSlotDetails: ITimeslot = {
    employeeId: '',
    date: '',
    startTime: '',
    endTime: ''
  };
  addressDetails: Address = {
    _id: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    pincode: 0,
    typeOfAddress: ''
  };
  bookingFee = 50;
  totalAmount = 0;
  errorMessage: string | null = null;

  constructor(
    private store: Store<BookingState>,
    private employeeService: EmployeeService,
    private serviceService: ServicesService,
    private categoryService: CategoryService,
    private userService: userService,
    private router: Router,
    private ngZone: NgZone,
  ) { }

  ngOnInit(): void {
    this.loadBookingData();
    this.loadServiceDetails();
    this.loadEmployeeDetails();
    this.loadTimeSlot();

  }

  loadBookingData(): void {
    this.store.select(selectServiceId).pipe(first()).subscribe(serviceId => {
      if (serviceId) {
        this.serviceId = serviceId;
        localStorage.setItem('serviceId', this.serviceId);
      } else {
        this.navigateToCategoryPage();
      }
    });

    this.store.select(selectTimeSlotId).pipe(first()).subscribe(timeslot => {
      if (timeslot) {
        this.timeslot = timeslot;
      } else {
        this.navigateToCategoryPage();
      }
    });

    this.store.select(selectEmployeeId).pipe(first()).subscribe(employeeId => {
      if (employeeId) {
        this.employeeId = employeeId;
      } else {
        this.navigateToCategoryPage();
      } 
    });
  }

  private navigateToCategoryPage(): void {
    console.log('Data missing, navigating to selection page...');
    this.serviceId = localStorage.getItem('serviceId');
    this.router.navigate(['/book/service-selection/', this.serviceId]);
  }

  loadServiceDetails(): void {
    if (this.serviceId) {
      this.serviceService.getServiceById(this.serviceId).subscribe({
        next: (response) => {
          if (response.data && typeof response.data === 'object') {
            this.service = response.data as IService;
            this.servicePrice = this.service.price;
            this.calculateTotalAmount();
            this.categoryId = this.service.category;

            this.categoryService.getCategoryById(this.categoryId).subscribe({
              next: (categoryResponse) => {
                this.categoryName = categoryResponse.data.name;
              },
              error: (err) => {
                console.error('Error fetching category', err);
              }
            });

          } else {
            console.error('No service data found');
          }
        },
        error: (err) => {
          console.error('Error fetching service', err);
        }
      });
    }
  }

  loadEmployeeDetails(): void {
    if (this.employeeId) {
      this.employeeService.getEmployeeDetails(this.employeeId).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            this.employeeDetails = response.data;
          } else {
            console.error('Error: No employee details found');
          }
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
    }
  }

  loadTimeSlot(): void {
    if (this.timeslot) {
      this.userService.getTimeSlotDetails(this.timeslot).subscribe(
        (response: any) => {
          if (response.success) {
            this.timeSlotDetails = response.data;
          } else {
            console.error('Error: No timeslot details found');
          }
        },
        (error) => {
          console.error('Error fetching timeslot details:', error);
        }
      );
    } else {
      console.error('Error: No slot ID provided');
    }
  }

  convertTo12HourFormat(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${period}`;
  }

  loadAddressSelected(): void {
    if (this.address) {
      this.userService.fetchSelectedAddress(this.address).subscribe(
        (response: any) => {
          if (response.success) {
            this.addressDetails = response.data;
          } else {
            console.error('Error: No address details found');
          }
        },
        (error) => {
          console.error('Error fetching address details:', error);
        }
      );
    }
  }

  onAddressSelected(addressId: string): void {
    this.selectedAddress = addressId;
    this.store.dispatch(setAddress({ address: addressId }));
    this.store.select(selectAddress).pipe(first()).subscribe(address => {
      this.address = address;
      console.log('Loaded address:', this.address);
    });
    this.loadAddressSelected();
  }

  calculateTotalAmount() {
    this.totalAmount = this.servicePrice + this.bookingFee;
  }

  onPaymentModeChange(mode: string): void {
    this.selectedPaymentMode = mode;
  }

  proceedToPayment(): void {
    if (!this.selectedPaymentMode && !this.selectedAddress) return;
    const bookingData = {
      userId: localStorage.getItem('user_id'),
      serviceId: this.serviceId,
      employeeId: this.employeeId,
      addressId: this.selectedAddress,
      timeslotId: this.timeslot,
      paymentMethod: this.selectedPaymentMode,
      totalAmount: this.totalAmount,
    };

    if (this.selectedPaymentMode === 'online') {
      this.initializeRazorpay(bookingData);
    } else if (this.selectedPaymentMode === 'cash') {
      this.handleCashOnDelivery(bookingData);
    } else {
      console.error('Invalid payment mode selected');
    }
  }

  showErrorMessageIfDisabled(event: MouseEvent) {
    if (!this.selectedPaymentMode || !this.address) {
      event.preventDefault(); 
      this.errorMessage = 'Select address and payment option';
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000);
    }
  }

  handleCashOnDelivery(bookingData: IBookingData) {
    console.log('Processing Cash on Delivery...');
    this.finalizeBooking(bookingData);
  }

  initializeRazorpay(bookingData: IBookingData) {
    const options = {
      key: import.meta.env.NG_APP_KEY_ID,
      amount: this.totalAmount * 100,
      currency: 'INR',
      name: 'Service Booking',
      description: 'Payment for Service Booking',
      handler: (response: any) => {
        this.ngZone.run(() => {
          const paymentResponse: PaymentResponse = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            status: 'Success',
            amount: this.totalAmount,
            currency: 'INR',
            timestamp: new Date()
          };
          this.finalizeBooking(bookingData, paymentResponse);
        });
      },
      prefill: {
        email: localStorage.getItem('userEmail'),
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };
  
    const rzp = new Razorpay(options);

    this.ngZone.runOutsideAngular(() => {
      rzp.open();
    });
  }

  finalizeBooking(bookingData: IBookingData, paymentResponse?: PaymentResponse) {
    this.userService.createBooking({
      ...bookingData,
      paymentResponse: paymentResponse || {},
    }).subscribe(
      (response: any) => {
        this.ngZone.run(() => {
          console.log('Booking successful:', response);
          const paymentDetails: PaymentDetails = {
            bookingStatus: 'Pending',
            paymentMethod: bookingData.paymentMethod,
            totalAmount: bookingData.totalAmount,
            paymentDate: new Date(),
            paymentResponse: paymentResponse || {}
          };
          this.router.navigate(['/book/payment-status'], { state: paymentDetails });
        });
      },
      (error) => {
        this.ngZone.run(() => {
          console.error('Error completing booking:', error);
          if (error.message.includes('Slot is already booked')) {
            alert('Sorry, the selected timeslot is already booked. Please choose another one.');
          } else {
            alert('An error occurred while completing your booking. Please try again.');
          }
        });
      }
    );
  }
}