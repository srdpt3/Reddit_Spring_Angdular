import { Component, OnInit } from '@angular/core';
import { PostModel } from '../auth/shared/postModel';
import { PostService } from '../auth/shared/post.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts$: Observable<PostModel>;

  constructor(private postService: PostService) {


  }

  async ngOnInit() {
    this.posts$ = await this.postService.getAllPosts();
  }
}
