import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-instructions',
  templateUrl: './quiz-instructions.component.html',
  styleUrls: ['./quiz-instructions.component.css']
})
export class QuizInstructionsComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _snack: MatSnackBar, private _quiz: QuizService, private _router: Router) { }

  quiz: any = [];
  qId: any;

  ngOnInit(): void {
    this.qId = this._route.snapshot.params.qid;
    this._quiz.quiz(this.qId).subscribe(
      (data) => {
        //console.log(data);
        this.quiz = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quiz: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    )
  }

  startQuiz() {
    Swal.fire({
      position: 'center',
      title: 'Ready to start ' + this.quiz.title + ' quiz?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Yes`,
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/quiz/' + this.qId]);
      }
    })

  }

}
