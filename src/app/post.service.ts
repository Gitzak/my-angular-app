import { Injectable } from '@angular/core';
// httpClient ------> passer des appels à un serveur HTTP avec le service  HttpClient
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // get all posts
  getAllPosts() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  // add post
  persistPost(post: { id: number; title: string; body: string; }) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', post);
  }

  // delete post by id
  deletePost(id: any) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  // update post
  updatePost(post: { id: any; title?: string; body?: string; }) {
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
  }

  // get post by id
  getPost(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  // get Comments by id Post
  getCommentsPost(id: number) {
    return this.http.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  }

}
