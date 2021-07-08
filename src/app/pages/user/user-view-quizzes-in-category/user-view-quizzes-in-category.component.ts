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
    this._route.params.subscribe((params) => {
      //console.log(params);
      this.catId = params['catId'];
      this._quiz.activeQuizzesInCategory(this.catId).subscribe(
        (data: any) => {
          //console.log(data);
          this.quizzesInCategory = data;
        },
        (error) => {
          console.log(error);
          this._snack.open("Server Error while loading quizzes: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
        }
      );
    })
  }

}
