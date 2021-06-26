import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private _quiz: QuizService, private _snack: MatSnackBar) { }

  quizzes: any = null;

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        console.log(data);
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quizzes: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
      }
    );
  }

}
