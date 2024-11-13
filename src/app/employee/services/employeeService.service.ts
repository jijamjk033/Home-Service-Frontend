import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResendOtpResponse, ResponseModel, SignupResponse, VerifyOtpResponse } from '../../User/models/userResponseModel';
import { employeeLoginResponse } from '../../User/models/employeeResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';
import { BookedTimeslot, timeslotDeletionResponse, timeSlotscreationResponse, timeSlotsResponse } from '../interface/employeeInterface';
import { EmployeeModel } from '../../User/models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiKey = environment.employeeApiUrl;
  private token: string | null = null;
  private jwtHelper = new JwtHelperService();


  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const isTrue = token ? !this.jwtHelper.isTokenExpired(token) : false;

      return isTrue;
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.token) {
        this.token = localStorage.getItem('employeeToken');
      }
    }
    return this.token;
  }

  login(data: object): Observable<ResponseModel<employeeLoginResponse>> {
    this.loggedIn.next(true);
    return this.http.post<ResponseModel<employeeLoginResponse>>(`${this.apiKey}/login`, data)
  }

  logout() {
    localStorage.removeItem('employeeToken');
    localStorage.removeItem('employee_id');
    localStorage.removeItem('employeeEmail');
    this.loggedIn.next(false);
    this.router.navigate(['/employeeHome']);
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

  getEmployeeDetails(id: string): Observable<ResponseModel<EmployeeModel>> {
    return this.http.get<ResponseModel<EmployeeModel>>(`${this.apiKey}/get-employeeDetails/${id}`);
  }

  createTimeSlots(data: object): Observable<ResponseModel<timeSlotscreationResponse>> {
    return this.http.post<ResponseModel<timeSlotscreationResponse>>(`${this.apiKey}/addTimeslots`, data);
  }

  getTimeSlots(id: string): Observable<ResponseModel<timeSlotsResponse[]>> {
    return this.http.get<ResponseModel<timeSlotsResponse[]>>(`${this.apiKey}/get-timeslots/${id}`);
  }

  deleteAllSlots(id: string): Observable<ResponseModel<timeslotDeletionResponse>> {
    return this.http.delete<ResponseModel<timeslotDeletionResponse>>(`${this.apiKey}/delete-timeslots/${id}`);
  }

  deleteSlotById(id: string): Observable<ResponseModel<timeslotDeletionResponse>> {
    return this.http.delete<ResponseModel<timeslotDeletionResponse>>(`${this.apiKey}/delete-timeslotsById/${id}`);
  }
}
