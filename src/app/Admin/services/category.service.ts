import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../User/models/userResponseModel';
import { CategoryModel } from '../Models/categoryModel';
import { CategoryResponse } from '../Models/categoryResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  
  private apiKey = import.meta.env.NG_APP_ADMIN_API_URL;

  constructor(private http:HttpClient) { }

  addCategory(data:object): Observable<ResponseModel<CategoryModel>>{
    return this.http.post<ResponseModel<CategoryModel>>(`${this.apiKey}/add-category`,data);
  }

  getCategories():Observable<ResponseModel<CategoryResponse[]>>{
    return this.http.get<ResponseModel<CategoryResponse[]>>(`${this.apiKey}/categories`);
  }
  
  deleteCategory(id: string):Observable<ResponseModel<CategoryModel>>{
    return this.http.delete<ResponseModel<CategoryModel>>(`${this.apiKey}/delete-category/${id}`);
  }
  //For editing category
  getCategoryById(id: string):Observable<ResponseModel<CategoryResponse>>{
    return this.http.get<ResponseModel<CategoryResponse>>(`${this.apiKey}/get-category/${id}`);
  }

  updateCategory(id: string, updatedCategory: object): Observable<ResponseModel<CategoryResponse>> {
    return this.http.put<ResponseModel<CategoryResponse>>(`${this.apiKey}/update-category/${id}`, updatedCategory);
  }
}
