import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post-model';
import { CreatePostPayload } from '../models/create-post-payload';
import { CommentPayload } from '../models/comment-payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPost(postId: Number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/post/' + postId);
  }

  getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/post');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/post/', postPayload);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/comments/', commentPayload);
  }

  getAllComments(postId: Number): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>('http://localhost:8080/api/comments/' + postId);
  }

  getAllPostsBySubreddit(subredditId: Number): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/posts/query/all/subreddit/' + subredditId);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:8080/api/post/query/user/' + name);
  }

  getAllCommentsByUser(name: string): Observable<CommentPayload[]> {
    return this.http.get<CommentPayload[]>('http://localhost:8080/api/comments/query/user/' + name);
  }
}
