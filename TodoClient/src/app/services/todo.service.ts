import {Injectable} from '@angular/core';
import {Todo} from '../models/todo';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todosUrl:string = 'http://localhost:8080/todo';
  loading:Observable<boolean>;

  constructor(private http:HttpClient) { }

  getLoading():Observable<boolean> {
    return this.loading;
  }

  // Get Todos
  getTodos():Observable<Todo[]> {
    this.loading = of(true);
    const result = this.http.get<Todo[]>(`${this.todosUrl}`);
    this.loading = of(false) ;
    return result;
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<undefined> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<undefined>(url, httpOptions);
  }

  // Create Todo
  createTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle Completed
  updateTodo(todo: Todo):Observable<Todo> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo, httpOptions);
  }
}
