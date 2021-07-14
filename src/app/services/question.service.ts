import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http: HttpClient) { }

  //get all questions of quiz
  public getQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }

  //get required questions of quiz (=numberOfQuestions)
  public getRequiredQuestionsOfQuiz(qid: any) {
    return this._http.get(`${baseUrl}/question/quiz/${qid}`);
  }

  //get single question
  public getQuestion(quesId: any) {
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //add question in quiz
  public addQuestionInQuiz(question: any) {
    return this._http.post(`${baseUrl}/question/`, question);
  }

  //update question
  public updateQuestion(question: any) {
    return this._http.put(`${baseUrl}/question/`, question);
  }

  //delete question
  public deleteQuestion(quesId: any) {
    return this._http.delete(`${baseUrl}/question/${quesId}`);
  }

  //evaluate result on submit
  public evaluateResult(questions: any) {
    return this._http.post(`${baseUrl}/question/quiz/evaluate`, questions);
  }
}
