import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  public getComments(): Observable<Comment[]>{
    const url = 'https://jsonplaceholder.typicode.com/comments';
    return this.http.get(url) as Observable<Comment[]>;
  }
}
