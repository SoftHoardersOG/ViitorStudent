import { Component, Input, OnInit } from '@angular/core';
import { _Comment } from 'src/app/models/comment.model';
import { ReviewModel } from 'src/app/models/review.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input("comment") comment: ReviewModel = new ReviewModel;
  constructor()  {}

  ngOnInit(): void {
  }

}
