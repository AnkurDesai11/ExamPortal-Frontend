import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _category: CategoryService, private _snack: MatSnackBar) { }

  color: ThemePalette = 'warn';

  categories: any = [
    // {
    //   cId: 1,
    //   title: "first category"
    // },
    // {
    //   cId: 2,
    //   title: "second category"
    // },
    // {
    //   cId: 3,
    //   title: "third category"
    // }
  ];

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cId: '',
    }
  };

  ngOnInit(): void {
    this._category.categories().subscribe(
      (data: any) => {
        //console.log(data);
        this.categories = data;
      },
      (error) => {
        //console.log(error);
        this._snack.open("Server Error while loading categories: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }
  formAddSubmit() {
    console.log(this.quizData)
    if (this.quizData.title.trim() == "" || this.quizData.description.trim() == "" || this.quizData.title.trim() == null || this.quizData.description.trim() == null) {
      this._snack.open("Title/Decription missing", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }
  }
}
