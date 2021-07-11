import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {


  constructor(private _category: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService, private _router: Router, private _route: ActivatedRoute) { }

  color: ThemePalette = 'warn';

  categories: any = [
    // {
    //   cId: 1,
    //   title: "first category"
    // },
    // {
    //   cId: 2,
    //   title: "second category"
    // },
    // {
    //   cId: 3,
    //   title: "third category"
    // }
  ];

  editedQuizData = {
    qid: 0,
    title: '',
    description: '',
    maxMarks: '',
    totalTime: '',
    numberOfQuestions: '',
    active: false,
    category: {
      cId: '',
    }
  };

  ngOnInit(): void {
    this.editedQuizData.qid = this._route.snapshot.params['id'];
    this._quiz.quiz(this.editedQuizData.qid).subscribe(
      (data: any) => {
        this.editedQuizData = data;
        //console.log(this.editedQuizData);
      },
      (error) => {
        //console.log(error);
        this._snack.open("Server Error: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
    this._category.categories().subscribe(
      (data: any) => {
        //console.log(data);
        this.categories = data;
      },
      (error) => {
        //console.log(error);
        this._snack.open("Server Error while loading categories: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }
  formEditSubmit() {
    //console.log(this.quizData);
    if (this.editedQuizData.title.trim() == "" || this.editedQuizData.description.trim() == "" || this.editedQuizData.title.trim() == null || this.editedQuizData.description.trim() == null) {
      this._snack.open("Title and Description cannot be blank", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }
    if (parseFloat(this.editedQuizData.maxMarks) < 1 || parseFloat(this.editedQuizData.numberOfQuestions) < 1 || parseFloat(this.editedQuizData.totalTime) < 1) {
      this._snack.open("Max marks/number of questions/total time cannot be less than 1", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    this._quiz.updateQuiz(this.editedQuizData).subscribe(
      (data: any) => {
        Swal.fire('Done', 'Quiz Updated successfully', 'success');
        this._router.navigate(['/admin-dashboard/quizzes/']);
      },
      (error) => {
        this._snack.open("Server Error: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }
}
