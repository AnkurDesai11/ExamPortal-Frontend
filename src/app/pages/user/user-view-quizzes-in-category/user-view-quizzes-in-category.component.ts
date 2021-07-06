import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-view-quizzes-in-category',
  templateUrl: './user-view-quizzes-in-category.component.html',
  styleUrls: ['./user-view-quizzes-in-category.component.css']
})
export class UserViewQuizzesInCategoryComponent implements OnInit {

  quizzesInCategory: any = [];
  catId: any;

  constructor(private _quiz: QuizService, private _snack: MatSnackBar, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.catId = this._route.snapshot.params['catId'];
    this._quiz.quizzesInCategory(this.catId).subscribe(
      (data: any) => {
        //console.log(data);
        this.quizzesInCategory = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quizzes: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
      }
    );
  }

}
