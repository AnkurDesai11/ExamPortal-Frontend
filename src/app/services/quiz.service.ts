import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  //get all quizzes
  public quizzes() {
    return this._http.get(`${baseUrl}/quiz/`);
  }

  //get all active quizzes
  public activeQuizzes() {
    return this._http.get(`${baseUrl}/quiz/active`);
  }

  //get single quiz
  public quiz(qid: any) {
    return this._http.get(`${baseUrl}/quiz/` + qid);
  }

  //get all quizzes in a category
  public quizzesInCategory(catId: any) {
    return this._http.get(`${baseUrl}/quiz/category/` + catId);
  }

  //get all active quizzes in a category
  public activeQuizzesInCategory(catId: any) {
    return this._http.get(`${baseUrl}/quiz/active/category/` + catId);
  }

  //add quiz
  public addQuiz(quiz: any) {
    return this._http.post(`${baseUrl}/quiz/`, quiz);
  }

  //update quiz
  public updateQuiz(quiz: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz);
  }

  //delete quiz
  public deleteQuiz(quizId: any) {
    return this._http.delete(`${baseUrl}/quiz/` + quizId);
  }
}
