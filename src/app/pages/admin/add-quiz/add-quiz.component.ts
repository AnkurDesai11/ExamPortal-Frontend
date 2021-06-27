import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  constructor() { }

  color: ThemePalette = 'warn';

  categories = [
    {
      cId: 1,
      title: "first category"
    },
    {
      cId: 2,
      title: "second category"
    },
    {
      cId: 3,
      title: "third category"
    }
  ]

  ngOnInit(): void {
  }

}
