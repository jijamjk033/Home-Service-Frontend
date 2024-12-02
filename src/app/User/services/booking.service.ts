import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../Environment/environment';
import { Observable, tap } from 'rxjs';
import { ResponseModel } from '../models/userResponseModel';
import { BookingDetails, BookingListData } from '../models/bookingInterface';
import { bookingCancelResponse, BookingResponse } from '../../employee/interface/employeeInterface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiKey = environment.userApiUrl;
  private employeeApiKey = environment.employeeApiUrl

  constructor(private http: HttpClient) { }

  getUserBookings(id: string): Observable<ResponseModel<BookingListData[]>> {
    return this.http.get<ResponseModel<BookingListData[]>>(`${this.apiKey}/getBookingList/${id}`).pipe(tap((response)=>{
      console.log('response fromn tap',response);
      
    }));
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
  cancelBooking(bookingId: string): Observable<ResponseModel<bookingCancelResponse>> {
    return this.http.post<ResponseModel<bookingCancelResponse>>(`${this.apiKey}/cancelBooking/${bookingId}`, {});
  }
}
