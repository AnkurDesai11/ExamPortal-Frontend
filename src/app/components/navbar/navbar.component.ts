import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  user = this.login.getUser();

  constructor(public login: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.login.getUser();
    this.isLoggedIn = this.login.userIsLoggedIn();
    this.login.loginStatusSubject.asObservable().subscribe(data => {
      this.user = this.login.getUser();
      this.isLoggedIn = this.login.userIsLoggedIn();
    })

  }

  public logout() {
    this.login.userLogout();
    this.login.loginStatusSubject.next(true);
    this.router.navigate(['']);
  }

}
