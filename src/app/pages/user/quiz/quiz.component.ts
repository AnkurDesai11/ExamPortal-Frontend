import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  questions: any = [];
  qId: any;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params.qid;
    this._question.getRequiredQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        //console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quiz questions " + error.error.text, "OK", { duration: 2000, verticalPosition: "top" });
      }
    )
  }

  preventBackButton() {
    history.pushState(null, "", location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, "", location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      position: 'center',
      title: 'Submit and finish ' + this.questions[0].quiz.title + ' quiz?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        //this._router.navigate(['/quiz/' + this.qId]);
      }
    })
  }
}
