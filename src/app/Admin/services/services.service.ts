import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../User/models/userResponseModel';
import { ServiceModel } from '../Models/categoryModel';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServiceResponse } from '../Models/categoryResponse';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private apiKey = import.meta.env.NG_APP_ADMIN_API_URL;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  addService(data: object): Observable<ResponseModel<ServiceModel>> {
    return this.http.post<ResponseModel<ServiceModel>>(`${this.apiKey}/add-service`, data);
  }

  getServicesByCategory(id: string): Observable<ResponseModel<ServiceResponse>> {
    return this.http.get<ResponseModel<ServiceResponse>>(`${this.apiKey}/get-services/${id}`);
  }
  getServiceById(serviceId:string): Observable<ResponseModel<ServiceResponse>>{
    return this.http.get<ResponseModel<ServiceResponse>>(`${this.apiKey}/get-servicebyId/${serviceId}`);
  }

  updateService(serviceId:string,data:object):Observable<ResponseModel<ServiceModel>>{
    return this.http.put<ResponseModel<ServiceModel>>(`${this.apiKey}/update-service/${serviceId}`,data);
  }

  deleteService(id:string):Observable<ResponseModel<ServiceModel>>{
    return this.http.delete<ResponseModel<ServiceModel>>(`${this.apiKey}/delete-service/${id}`);
  }
}
