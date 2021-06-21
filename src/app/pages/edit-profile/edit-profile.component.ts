import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private snack: MatSnackBar, private login: LoginService, private router: Router) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  retype: any = null;

  editDetails = {
    username: '',
    password: ''
  }

  verifiedUser: any = null;

  currentUser: any = null;

  ngOnInit(): void {
    this.currentUser = this.login.getUser();
    this.editDetails.username = this.currentUser.username;
  }

  formEditSubmit() {
    let regexpcontact = new RegExp('^[- +()0-9]{6,15}$');
    let regexppassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}');

    if ((this.currentUser.phone != "" && this.currentUser.phone != null) && !regexpcontact.test(this.currentUser.phone)) {
      this.snack.open("Enter valid contact number", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    if (!regexppassword.test(this.currentUser.password)) {
      this.snack.open("Password should contain atleast one of the following symbols - ' ! @ # $ % ^ & ' one uppercase, one lowercase letter, one number and should be atleast 8 characters long", "OK", { verticalPosition: "top" });
      return;
    }

  }

}
