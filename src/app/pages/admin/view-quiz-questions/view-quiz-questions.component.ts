import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

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

  onDelete(q: any) {
    //console.log(quiz);
    Swal.fire({
      title: 'Do you want to delete quiz: ' + q.content + '?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._question.deleteQuestion(q.quesId).subscribe(
          (data) => {
            //console.log(data);

            if (data) {
              this.questions = this.questions.filter((questions: any) => questions.quesId != q.quesId);
              Swal.fire('Question: ' + q.content + " deleted", '', 'success');
            }
            else {
              Swal.fire('Question: ' + q.content + " could not be deleted" + q.content, '', 'error');
            }
          },
          (error) => {
            Swal.fire('Server error while deleting Question: ' + q.content + " please try again", '', 'error');
          }
        );
      }
    })
  }

}
