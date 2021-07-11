import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor(private _category: CategoryService, private _snack: MatSnackBar, private _quiz: QuizService) { }

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

  quizData = {
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
  formAddSubmit() {
    //console.log(this.quizData);
    if (this.quizData.title.trim() == "" || this.quizData.description.trim() == "" || this.quizData.title.trim() == null || this.quizData.description.trim() == null) {
      this._snack.open("Title and Description cannot be blank", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }
    if (parseFloat(this.quizData.maxMarks) < 1 || parseFloat(this.quizData.numberOfQuestions) < 1 || parseFloat(this.quizData.totalTime) < 1) {
      this._snack.open("Max marks/number of questions/total time cannot be less than 1", "OK", { duration: 2000, verticalPosition: "top" });
      return;
    }

    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Done', 'Quiz added successfully', 'success');
        this.quizData = {
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
      },
      (error) => {
        this._snack.open("Server Error: " + error.error.text, "", { duration: 2000, verticalPosition: "top" })
      }
    );
  }
}
