import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ResponseModel } from '../models/userResponseModel';
import { BookingDetails, BookingListData } from '../models/bookingInterface';
import { bookingCancelResponse, BookingResponse } from '../../employee/interface/employeeInterface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiKey = import.meta.env.NG_APP_USER_API_URL;
  private employeeApiKey = import.meta.env.NG_APP_EMPLOYEE_API_URL;

  constructor(private http: HttpClient) { }

  getUserBookings(id: string): Observable<ResponseModel<BookingListData[]>> {
    return this.http.get<ResponseModel<BookingListData[]>>(`${this.apiKey}/getBookingList/${id}`);
  }

  getEmployeeBookings(id: string): Observable<ResponseModel<BookingListData[]>>{
    return this.http.get<ResponseModel<BookingListData[]>>(`${this.employeeApiKey}/getBookingsEmployees/${id}`);
  }

  getBookingDetails(id: string): Observable<ResponseModel<BookingDetails>> {
    return this.http.get<ResponseModel<BookingDetails>>(`${this.apiKey}/getBookingDetails/${id}`);
  }

  updateBookingStatus(id: string, booking: Partial<BookingDetails>): Observable<ResponseModel<BookingResponse>> {
    return this.http.put<ResponseModel<BookingResponse>>(`${this.employeeApiKey}/updateStatus/${id}`, booking);
  }

  cancelBooking(id: string, recipientId:string, senderModel:string): Observable<ResponseModel<bookingCancelResponse>> {
    const data = { recipientId, senderModel };
    return this.http.post<ResponseModel<bookingCancelResponse>>(`${this.apiKey}/cancelBooking/${id}`, data);
  }
}
