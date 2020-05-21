import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  public getPost() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    return this.http.get(url);
  }
}
