import { UniversityCardModel } from './../../models/university-card.model';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-university-big-card',
  templateUrl: './university-big-card.component.html',
  styleUrls: ['./university-big-card.component.css']
})
export class UniversityBigCardComponent implements OnInit {
  commentService:CommentService=new CommentService();
  comments:Array<_Comment>;
  constructor(@Inject(MAT_DIALOG_DATA) public data: UniversityCardModel) {
    this.comments=this.commentService.getComments();
  }

  ngOnInit(): void {
    
  }

}
