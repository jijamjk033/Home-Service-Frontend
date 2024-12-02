import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../Environment/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseModel } from '../../User/models/userResponseModel';
import { AdminLoginResponse } from '../../User/models/adminResponseModel';
import { UserModel } from '../../User/models/userModel';
import { EmployeeModel } from '../../User/models/employeeModel';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {

  private apiKey = environment.adminApiUrl;

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('adminToken');
      return !!token; 
    }
    return false;
  }
  

  constructor(private http:HttpClient,private router:Router,@Inject(PLATFORM_ID) private platformId: Object) { }


  login(data:object):Observable<ResponseModel<AdminLoginResponse>>{
    return this.http.post<ResponseModel<AdminLoginResponse>>(`${this.apiKey}/login`,data)
  }

  logout():void{
    localStorage.removeItem('adminToken');
    this.router.navigate(['/form/adminLogin']);
  }

  getUsersList():Observable<ResponseModel<UserModel[]>>{
    return this.http.get<ResponseModel<UserModel[]>>(`${this.apiKey}/user-list`);
    
  }
  getEmployeesList():Observable<ResponseModel<EmployeeModel[]>>{
    return this.http.get<ResponseModel<EmployeeModel[]>>(`${this.apiKey}/employee-list`);
    
  }

  updateUserVerificationStatus(userId: string, is_verified: boolean): Observable<ResponseModel<UserModel>> {
    return this.http.patch<ResponseModel<UserModel>>(`${this.apiKey}/users/${userId}/verification`, { is_verified });
  }
  
}
