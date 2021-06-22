import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //adding user
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
  //editing user
  public editUser(verifiedUser: any) {
    return this.http.put(`${baseUrl}/user/`, verifiedUser);
  }
}
