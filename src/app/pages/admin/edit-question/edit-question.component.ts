import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(private _snack: MatSnackBar, private _question: QuestionService, private _route: ActivatedRoute, private _router: Router) { }
  quesId: any;
  quizId: any;
  quizTitle: any;
  editedQuestion: any = {
    quesId: '',
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
    this.quesId = this._route.snapshot.params['qid'];
    this.quizTitle = this._route.snapshot.params['title'];
    this.editedQuestion.quiz['qId'] = this.quizId;
    this.editedQuestion.quesId = this.quesId;
    this._question.getQuestion(this.quesId).subscribe(
      (data: any) => {
        //console.log(data)
        this.editedQuestion.content = data.content;
        this.editedQuestion.option1 = data.option1;
        this.editedQuestion.option2 = data.option2;
        this.editedQuestion.option3 = data.option3;
        this.editedQuestion.option4 = data.option4;
        this.editedQuestion.answer = data.answer;
      },
      (error) => {
        this._snack.open("Server Error while loading question: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
      }
    );

  }

  formEditSubmit() {
    if (this.editedQuestion.content.trim() == "" || this.editedQuestion.content == null) {
      this._snack.open("Question cannot be blank", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }
    var blankOptions = 0;
    blankOptions = (this.editedQuestion.option1.trim()) == '' || (this.editedQuestion.option1) == null ? blankOptions + 1 : blankOptions;
    blankOptions = (this.editedQuestion.option2.trim()) == '' || (this.editedQuestion.option2) == null ? blankOptions + 1 : blankOptions;
    blankOptions = (this.editedQuestion.option3.trim()) == '' || (this.editedQuestion.option3) == null ? blankOptions + 1 : blankOptions;
    blankOptions = (this.editedQuestion.option4.trim()) == '' || (this.editedQuestion.option4) == null ? blankOptions + 1 : blankOptions;
    if (blankOptions > 2) {
      this._snack.open("Altleast 2 non-blank options required", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    this._question.updateQuestion(this.editedQuestion).subscribe(
      (data: any) => {
        //console.log(data);
        Swal.fire('Success', 'Question edited', 'success');
        this.editedQuestion.content = '';
        this.editedQuestion.option1 = '';
        this.editedQuestion.option2 = '';
        this.editedQuestion.option3 = '';
        this.editedQuestion.option4 = '';
        this.editedQuestion.answer = '';
        this._router.navigate(['/admin-dashboard/view-questions/' + this.quizId + '/' + this.quizTitle]);
      },
      (error) => {
        //console.log(error);
        Swal.fire('Error', 'Error in eidting question', 'error');
      }
    );
  }
}

