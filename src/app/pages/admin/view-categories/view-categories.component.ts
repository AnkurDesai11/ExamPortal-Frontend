import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  categories: any = {
    title: '',
    description: ''
  };

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }

}
