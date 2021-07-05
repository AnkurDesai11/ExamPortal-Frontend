import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //create event to dynamically load values on login/logout in componenets like navbar
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //generate token
  public generateToken(loginDetails: any) {
    return this.http.post(`${baseUrl}/generate-token`, loginDetails);
  }

  //save generated token in localStorage
  public userLoggedIn(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  //check if token exists
  public userIsLoggedIn() {
    let tokenString = localStorage.getItem('token');
    if (tokenString == undefined || tokenString == null || tokenString == "") {
      return false;
    } else {
      return true;
    }
  }

  //logout user clear saved token
  public userLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set user details
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //get user
  public getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.userLogout();
      return null;
    }
  }

  //get current/logged-in user
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`);
  }

  //get user role/authority
  public getUserRole() {
    return this.getUser().authorities[0].authority;
  }

  //verify password to edit profile
  public passwordVerify(editDetails: any) {
    return this.http.post(`${baseUrl}/user/edit-auth`, editDetails);
  }
}
