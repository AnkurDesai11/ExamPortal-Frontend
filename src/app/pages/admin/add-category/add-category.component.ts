import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private _category: CategoryService, private _snack: MatSnackBar, private _router: Router) { }

  category = {
    title: '',
    description: ''
  }

  ngOnInit(): void {
  }

  formAddSubmit() {
    if (this.category.title.trim() == "" || this.category.description.trim() == "" || this.category.title.trim() == null || this.category.description.trim() == null) {
      this._snack.open("Title/Decription missing", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    this._category.addCategory(this.category).subscribe(
      (data: any) => {
        this.category.title = '';
        this.category.description = '';
        Swal.fire("Done", "Category added successfully", "success");
        //this._router.navigate(['/admin-dashboard/categories']);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error", "Server error", "error");
      }
    );
  }

}
