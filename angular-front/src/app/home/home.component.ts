import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { PostModel } from '../models/post-model';
import { Observable } from 'rxjs';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // posts$: Observable<PostModel>;

  // constructor(private postService: PostService) {

  // }
  // async ngOnInit() {
  //   this.posts$ = await this.postService.getAllPosts();
  // }

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  faComments = faComments;
  posts: PostModel[] = [];

  constructor(private postService: PostService, private router: Router) {
    this.postService.getAllPosts().subscribe(post => {
      console.log(post);

      this.posts = post;
    })
  }

  ngOnInit() {
  }

}