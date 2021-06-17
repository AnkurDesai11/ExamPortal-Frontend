import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private login: LoginService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.login.userIsLoggedIn() && this.login.getUserRole() == "ADMIN") {
      this.router.navigate(['admin-dashboard']);
      return false;
    } else if (this.login.userIsLoggedIn() && this.login.getUserRole() == "NORMAL") {
      this.router.navigate(['user-dashboard']);
      return false;
    }
    return true;
  }
}
