import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  question: string;
  options: string[];
  answer: string;
}

export interface Quiz {
  title: string;
  icon: string;
  questions: Question[];
}

export interface QuizData {
  quizzes: Quiz[];
}

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  dataUrl = '../assets/data.json';

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<QuizData> {
    return this.http.get<QuizData>(this.dataUrl);
  }
}
