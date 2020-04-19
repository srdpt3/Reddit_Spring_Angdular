import { Component, OnInit } from '@angular/core';
import { SubredditModel } from 'src/app/models/subreddit-model';
import { SubredditService } from 'src/app/services/subreddit.service';

@Component({
  selector: 'app-sub-side-bar',
  templateUrl: './sub-side-bar.component.html',
  styleUrls: ['./sub-side-bar.component.css']
})
export class SubSideBarComponent implements OnInit {

  subreddits: Array<SubredditModel> = [];
  displayViewAll: boolean;

  constructor(private subredditService: SubredditService) { }

  ngOnInit(): void {
    this.subredditService.getAllSubreddits().subscribe(data => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }
}
