import { Component, OnInit } from '@angular/core';
import { PostModel } from '../auth/shared/postModel';
import { PostService } from '../auth/shared/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: Array<PostModel> = [];

  constructor(private postService: PostService) {

    this.postService.getAllPosts().subscribe(post => {

      console.log(post);
      this.posts$ = post;


    })
  }

  ngOnInit(): void {
  }
}