import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/models/post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  @Input() data: Array<PostModel>;
  faComments = faComments;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }
}
