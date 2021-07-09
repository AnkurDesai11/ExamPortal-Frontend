import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _snack: MatSnackBar, private _quiz: QuizService) { }

  quiz: any = [];
  qid: any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this._quiz.quiz(this.qid).subscribe(
      (data) => {
        console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quiz: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    )
  }

}
