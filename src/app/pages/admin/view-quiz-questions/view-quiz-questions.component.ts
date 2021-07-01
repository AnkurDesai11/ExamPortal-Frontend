import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  constructor(private _snack: MatSnackBar, private _question: QuestionService, private _route: ActivatedRoute) { }
  quizId: any;
  quizTitle: any;
  questions: any = [];
  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['id'];
    this.quizTitle = this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.quizId).subscribe(
      (data: any) => {
        //console.log(data)
        this.questions = data;
      },
      (error) => {
        this._snack.open("Server Error while loading questions: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
      }
    );
  }

}
