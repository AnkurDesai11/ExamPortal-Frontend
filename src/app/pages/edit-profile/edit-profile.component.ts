import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private snack: MatSnackBar, private login: LoginService, private user: UserService, private router: Router, private _route: ActivatedRoute) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  retype = '';
  private newpswd: any = '';

  editDetails = {
    username: '',
    password: ''
  }

  verifiedUser = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  currentUser: any = null;

  ngOnInit(): void {
    this.currentUser = this.login.getUser();
    this.editDetails.username = this.currentUser.username;
  }

  formEditSubmit() {
    let regexpcontact = new RegExp('^[- +()0-9]{6,15}$');
    let regexppassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}');

    if ((this.currentUser.phone.trim() != "" && this.currentUser.phone != null) && !regexpcontact.test(this.currentUser.phone)) {
      this.snack.open("Enter valid contact number", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    if (!regexppassword.test(this.currentUser.password) && this.retype != null && this.retype != '') {
      this.snack.open("New password should contain atleast one of the following symbols - ' ! @ # $ % ^ & ' one uppercase, one lowercase letter, one number and should be atleast 8 characters long", "OK", { verticalPosition: "top" });
      return;
    }

    if (this.retype == null || this.retype == '') {
      this.newpswd = this.editDetails.password;
    }
    else {
      this.newpswd = this.currentUser.password;
    }

    console.log("edit profile initiated");

    this.login.passwordVerify(this.editDetails).subscribe(
      (user: any) => {
        this.verifiedUser.username = user.username;
        this.verifiedUser.password = this.newpswd;
        this.verifiedUser.email = this.currentUser.email;
        this.verifiedUser.firstName = this.currentUser.firstName;
        this.verifiedUser.lastName = this.currentUser.lastName;
        this.verifiedUser.phone = this.currentUser.phone;
        this.retype = "";
        this.newpswd = "";
        this.editDetails.password = "";
        this.currentUser.password = '';
        this.user.editUser(this.verifiedUser).subscribe(
          (updatedUser: any) => {
            this.login.getCurrentUser().subscribe(
              (updatedUser: any) => {
                this.login.setUser(updatedUser);
                //console.log(updatedUser.username);
                this.retype = "";
                this.newpswd = "";
                this.editDetails.password = "";
                this.currentUser.password = '';
              }
            );
            Swal.fire("Success", "Details updated for: " + updatedUser.username, "success");
            this.router.navigate(['../profile'], { relativeTo: this._route });
          },
          (updateError) => {
            this.editDetails.password = "";
            this.retype = "";
            this.newpswd = "";
            this.currentUser.password = '';
            //should not happen unless deliberate change of username in logic flow
            console.log(updateError.error.text);
            this.snack.open("Error: User does not exist in database", "OK", { duration: 2000, verticalPosition: "top" });
          }
        );
      },
      (verifyError) => {
        this.editDetails.password = "";
        this.retype = "";
        this.newpswd = "";
        this.currentUser.password = '';
        console.log(verifyError.error.text);
        if (verifyError.error.text == "User does not exist in database") {
          this.snack.open("Error: User does not exist in database", "OK", { duration: 2000, verticalPosition: "top" });
        }
        if (verifyError.error.text == "Incorrect old password") {
          this.snack.open("Error: Incorrect old password", "OK", { duration: 2000, verticalPosition: "top" });
        }
      }
    );

  }

}
