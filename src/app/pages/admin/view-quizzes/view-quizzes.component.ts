import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  constructor(private _quiz: QuizService, private _snack: MatSnackBar, private _router: Router) { }

  quizzes: any = null;

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        //console.log(data);
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        this._snack.open("Server Error while loading quizzes: " + error.error.text, "", { duration: 2000, verticalPosition: "top" });
      }
    );
  }

  //directly use [routerLink]='"/admin-dashboard/add-quiz/"+q.qId' instead of (click)="onEdit(q.qId)"
  //onEdit(id: any) {
  //console.log(id);
  //  this._router.navigate(['/admin-dashboard/edit-quiz/' + id]);
  //}

  onDelete(quiz: any) {
    //console.log(quiz);
    Swal.fire({
      title: 'Do you want to delete quiz: ' + quiz.title + '?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(quiz.qId).subscribe(
          (data) => {
            //console.log(data);

            if (data) {
              this.quizzes = this.quizzes.filter((quizzes: any) => quizzes.qId != quiz.qId);
              Swal.fire('Quiz: ' + quiz.title + " deleted", '', 'success');
            }
            else {
              Swal.fire('Quiz: ' + quiz.title + " could not be deleted" + quiz.title, '', 'error');
            }
          },
          (error) => {
            Swal.fire('Server error while deleting Quiz: ' + quiz.title + " please try again", '', 'error');
          }
        );
      }
    })


  }

}
