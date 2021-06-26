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
}
