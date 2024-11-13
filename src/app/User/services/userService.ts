import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../Environment/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginResponse, ResendOtpResponse, ResponseModel, SignupResponse, VerifyOtpResponse } from '../models/userResponseModel';
import { isPlatformBrowser } from '@angular/common';
import { addAddressResponse, Address, getAddressResponse } from '../models/address';
import { BookedTimeslot, BookingResponse, timeslotResponse } from '../../employee/interface/employeeInterface';

@Injectable({
  providedIn: 'root'
})

export class userService {

  private token: string | null = null;
  private jwtHelper = new JwtHelperService();
  private apiKey = environment.userApiUrl;
  private redirectUrl: string = '/userHome';
  private employeeId = new BehaviorSubject<string | null>(null);
  private slotBooked = new BehaviorSubject<string | null>(null);

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.token) {
        this.token = localStorage.getItem('userToken');
      }
    }
    return this.token;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const isTrue = token ? !this.jwtHelper.isTokenExpired(token) : false;
      return isTrue;
    }
    return false;
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl() {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = '/userHome'
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user_id');
    localStorage.removeItem('userEmail');
    this.loggedIn.next(false);
    this.router.navigate(['/userHome']);
  }

  signup(data: object): Observable<ResponseModel<SignupResponse>> {
    return this.http.post<ResponseModel<SignupResponse>>(`${this.apiKey}/signup`, data);
  }

  verifyOtp(otp: string, token: string): Observable<ResponseModel<VerifyOtpResponse>> {
    const body = { otp, token };
    return this.http.post<ResponseModel<VerifyOtpResponse>>(`${this.apiKey}/verify-otp`, body);
  }

  resendOtp(email: string): Observable<ResponseModel<ResendOtpResponse>> {
    const body = { email };
    return this.http.post<ResponseModel<ResendOtpResponse>>(`${this.apiKey}/resend-otp`, body);
  }

  login(data: object): Observable<ResponseModel<LoginResponse>> {
    return this.http.post<ResponseModel<LoginResponse>>(`${this.apiKey}/login`, data);
  }

  addAddress(data: object): Observable<ResponseModel<addAddressResponse>> {
    return this.http.post<ResponseModel<addAddressResponse>>(`${this.apiKey}/add-address`, data);
  }

  getAddresses(id: string): Observable<ResponseModel<getAddressResponse[]>> {
    return this.http.get<ResponseModel<getAddressResponse[]>>(`${this.apiKey}/get-address/${id}`);
  }

  fetchSelectedAddress(id: string): Observable<ResponseModel<getAddressResponse>> {
    return this.http.get<ResponseModel<getAddressResponse>>(`${this.apiKey}/fetch-address/${id}`);
  }

  setEmployeeId(employeeId: string | null): void {
    this.employeeId.next(employeeId);
  }

  setTimeSlot(slotId: string | null): void {
    this.slotBooked.next(slotId);
  }

  getEmployeeId() {
    return this.employeeId.asObservable();
  }

  getTimeslotSelected() {
    return this.slotBooked.asObservable();
  }

  fetchTimeSlots(id: string, date: string): Observable<ResponseModel<timeslotResponse[]>> {
    return this.http.get<ResponseModel<timeslotResponse[]>>(`${this.apiKey}/fetch-timeslots/${id}?date=${date}`);
  }

  getTimeSlotDetails(id: string): Observable<ResponseModel<timeslotResponse>> {
    return this.http.get<ResponseModel<timeslotResponse>>(`${this.apiKey}/get-timeslot/${id}`);
  }

  createBooking(bookingData: {}): Observable<ResponseModel<BookingResponse>> {
    return this.http.post<ResponseModel<BookingResponse>>(`${this.apiKey}/booking`, bookingData);
  }
  
  bookTimeSlot(slotId: string): Observable<ResponseModel<BookedTimeslot>> {
    return this.http.post<ResponseModel<BookedTimeslot>>(`${this.apiKey}/bookTimeslots/${slotId}`, null);
  }
}
