import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  categories: any = [];

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

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

}
