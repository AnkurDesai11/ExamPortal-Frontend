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
  timer: any;
  timerColor = "primary";
  done = false;
  score: any;
  attempts: any;
  correctAnswers: any;
  total: any;
  percent: any;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _question: QuestionService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params.qid;
    this._question.getRequiredQuestionsOfQuiz(this.qId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
        this.timer = this.questions[0].quiz.totalTime * 60;
        this.total = this.questions[0].quiz.maxMarks;
        this.startTimer();
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
        this.evalQuiz();
      }
    })
  }

  startTimer() {
    let timeout = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(timeout);
      }
      else {
        this.timer--;
        if (((this.timer / (this.questions[0].quiz.totalTime * 60)) * 100) <= 15) {
          this.timerColor = "warn";
        }
      }
    }, 1000)
  }

  getFormattedTime() {
    let hr = Math.floor((this.timer / 60) / 60);
    let min = Math.floor(this.timer / 60) - hr * 60;
    let sec = this.timer - min * 60;
    return `${hr}: ${min}: ${sec}`
  }

  evalQuiz() {
    this.done = true;
    console.log(this.done);
    console.log(this.questions);
    //server side result evaluation
    this._question.evaluateResult(this.questions).subscribe(
      (data: any) => {
        //console.log(data);
        this.score = parseFloat(Number(data.score).toFixed(2));
        this.percent = parseFloat(Number((data.score / this.total) * 100).toFixed(2))
        this.attempts = data.attempts;
        this.correctAnswers = data.correctAnswers;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  printPage() {
    //can use file-saver library for better formatting
    window.print();
  }

}
