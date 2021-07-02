import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  constructor(private _snack: MatSnackBar, private _question: QuestionService, private _route: ActivatedRoute) { }
  quizId: any;
  quizTitle: any;
  question: any = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }
  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['id'];
    this.quizTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.quizId;
  }

}
