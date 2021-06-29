import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _category: CategoryService, private _snack: MatSnackBar, private _router: Router) { }

  categories = [
    {
      cId: 0,
      title: '',
      description: ''
    },
  ];

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        //console.log(this.categories);
      },
      (error) => {
        //console.log(error);
        this._snack.open("Server Error while loading categories: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }

  //directly use [routerLink]='"/admin-dashboard/add-category/"+c.cId' instead of (click)="onEdit(c.cId)"
  onEdit(id: any) {
    //console.log(id);
    this._router.navigate(['/admin-dashboard/edit-category/' + id]);
  }

  onDelete(category: any) {
    Swal.fire({
      title: 'Do you want to delete category: ' + category.title + '?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(category.cId).subscribe(
          (data) => {
            //console.log(data);

            if (data) {
              //   this._category.categories().subscribe(
              //     (data: any) => {
              //       this.categories = data;
              //       //console.log(this.categories);
              //     },
              //     (error) => {
              //       //console.log(error);
              //       this._snack.open("Server Error while deleting category: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
              //     }
              //   );
              //No need to call server to reload categories to remove deleted category, can do the same by filter

              this.categories = this.categories.filter((categories: any) => categories.cId != category.cId);
              Swal.fire('Category: ' + category.title + " deleted", '', 'success');
            }
            else {
              Swal.fire('Category: ' + category.title + " could not be deleted" + category.title, '', 'error');
            }
          },
          (error) => {
            Swal.fire('Server error while deleting Category: ' + category.title + " please try again", '', 'error');
          }
        );
      }
    })


  }

}
