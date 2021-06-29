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

  //get all quizzes
  public quiz(qid: any) {
    return this._http.get(`${baseUrl}/quiz/` + qid);
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
