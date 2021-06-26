import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http: HttpClient) { }

  //load all categories
  public categories() {
    return this._http.get(`${baseUrl}/category/`);
  }

  //create new category
  public addCategory(category: any) {
    return this._http.post(`${baseUrl}/category/`, category);
  }

  //get single category
  public category(id: any) {
    return this._http.get(`${baseUrl}/category/${id}`);
  }

  //update category
  public updateCategory(category: any) {
    return this._http.put(`${baseUrl}/category/`, category);
  }

  //delete category
  public deleteCategory(id: any) {
    return this._http.delete(`${baseUrl}/category/${id}`);
  }
}
