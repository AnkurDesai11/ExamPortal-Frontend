import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }

  formSubmit() {
    //adduser function call
    let regexpcontact = new RegExp('^[- +()0-9]{6,15}$');
    let regexppassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}');

    if (!regexppassword.test(this.user.password)) {
      this.snack.open("Password should contain atleast one of the following symbols - ' ! @ # $ % ^ & ' one uppercase, one lowercase letter, one number and should be atleast 8 characters long", "OK", { verticalPosition: "top" });
      return;
    }

    if (this.user.username.trim() == '' || this.user.username == null) {
      this.snack.open("Username cannot be empty", "OK", { verticalPosition: "top" });
      return;
    }

    if ((this.user.phone.trim() != "" && this.user.phone != null) && !regexpcontact.test(this.user.phone)) {
      this.snack.open("Enter valid contact number", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        Swal.fire("Success", "User registered with ID " + data.id, "success");
      },
      (error) => {
        //error
        console.log(error);
        //lert("error");
        this.snack.open("Error: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    )
  }

}
