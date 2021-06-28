import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private _category: CategoryService, private _snack: MatSnackBar, private _route: ActivatedRoute, private _router: Router) { }

  editedCategory = {
    id: 0,
    title: '',
    description: ''
  }
  ngOnInit(): void {
    this.editedCategory.id = this._route.snapshot.params['id'];
    //console.log(this.editedCategory.id);
    this._category.category(this.editedCategory.id).subscribe(
      (data: any) => {
        this.editedCategory = data;
        //console.log(this.editedCategory);
      },
      (error) => {
        //console.log(error);
        this._snack.open("Server Error: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }

  formEditSubmit() {
    if (this.editedCategory.title.trim() == "" || this.editedCategory.description.trim() == "" || this.editedCategory.title.trim() == null || this.editedCategory.description.trim() == null) {
      this._snack.open("Title/Decription missing", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }
    this._category.updateCategory(this.editedCategory).subscribe(
      (data: any) => {
        Swal.fire("Done", "Category added successfully", "success");
        this._router.navigate(['/admin-dashboard/categories/']);
      },
      (error) => {
        this._snack.open("Category edit failed, please try again", "OK", { duration: 3000, verticalPosition: "top" });
      }
    );
  }

}
