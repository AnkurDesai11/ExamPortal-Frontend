import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-user-view-quizzes',
  templateUrl: './user-view-quizzes.component.html',
  styleUrls: ['./user-view-quizzes.component.css']
})
export class UserViewQuizzesComponent implements OnInit {

  quizzes: any = [];

  constructor(private _quiz: QuizService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._quiz.activeQuizzes().subscribe(
      (data: any) => {
        //console.log(data);
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quizzes: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
      }
    );
  }

}
