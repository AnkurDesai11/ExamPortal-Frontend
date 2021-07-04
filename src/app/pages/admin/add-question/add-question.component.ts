import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(private _snack: MatSnackBar, private _question: QuestionService, private _route: ActivatedRoute) { }
  quizId: any;
  quizTitle: any;
  question: any = {
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
    quiz: {},
  }
  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['id'];
    this.quizTitle = this._route.snapshot.params['title'];
    this.question.quiz['qId'] = this.quizId;
  }

  formAddSubmit() {
    if (this.question.content.trim() == "" || this.question.content == null) {
      this._snack.open("Question cannot be blank", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }
    var blankOptions = 0;
    blankOptions = (this.question.option1.trim()) == '' || (this.question.option1) == null ? blankOptions + 1 : blankOptions;
    blankOptions = (this.question.option2.trim()) == '' || (this.question.option2) == null ? blankOptions + 1 : blankOptions;
    blankOptions = (this.question.option3.trim()) == '' || (this.question.option3) == null ? blankOptions + 1 : blankOptions;
    blankOptions = (this.question.option4.trim()) == '' || (this.question.option4) == null ? blankOptions + 1 : blankOptions;
    if (blankOptions > 2) {
      this._snack.open("Altleast 2 non-blank options required", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    this._question.addQuestionInQuiz(this.question).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire('Success', 'Question added', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.answer = '';
      },
      (error) => {
        //console.log(error);
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
