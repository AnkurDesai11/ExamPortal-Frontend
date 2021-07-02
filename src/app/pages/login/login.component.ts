import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails = {
    username: '',
    password: ''
  }
  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  ngOnInit(): void {
  }
  formLogin() {
    //console.log("login initiated");

    //request server to generate token
    this.login.generateToken(this.loginDetails).subscribe(
      (data: any) => {
        //console.log("token generated");
        //console.log(data);
        //user validation token generated, proceed with actual login
        this.login.userLoggedIn(data.token);
        this.login.getCurrentUser().subscribe(
          (user: any) => {
            this.login.setUser(user);
            //console.log(user.username);

            //redirect to normal-user or admin-user dashboard
            if (this.login.getUserRole() == "ADMIN") {
              //window.location.href = "/admin-dashboard";
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['admin-dashboard']);
            } else if (this.login.getUserRole() == "NORMAL") {
              //window.location.href = "/user-dashboard";
              this.login.loginStatusSubject.next(true);
              this.router.navigate(['user-dashboard']);
            } else {
              this.login.userLogout();
              //location.reload();
            }

          },
        );
      },
      (error) => {
        //console.log("error while generating token");
        //console.log(error.error.text);
        if (error.error.text == "Invalid Credentials  Bad credentials") {
          this.snack.open("Invalid username and password combination", "OK", { duration: 2000, verticalPosition: "top" });
        }
        else {
          this.snack.open("Error while connecting to server, please try again", "OK", { duration: 2000, verticalPosition: "top" });
        }
      }
    );
  }

}
