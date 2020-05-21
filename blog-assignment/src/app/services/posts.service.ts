import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public getPost(): Observable<Post[]> {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url) as Observable<Post[]>;
  }
}
