import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MAIN_URL } from '../../shared/constants/app';
import { Todo } from '../models/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos(tabId: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${MAIN_URL}/todo/${tabId}`);
  }

  addTodo(tab: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${MAIN_URL}/todo`, tab);
  }

  updateTodo(tab: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${MAIN_URL}/todo`, tab);
  }
}
