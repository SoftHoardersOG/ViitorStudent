import { UniversityCardModel } from './../../models/university-card.model';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _Comment } from 'src/app/models/comment.model';
import { UniversityExtendedModel } from 'src/app/models/university-extended.model';
import { UniversityCardService } from 'src/app/services/university-card.service';
import { CommentService } from 'src/app/services/comment.service';
import { ReviewModel } from 'src/app/models/review.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-university-big-card',
  templateUrl: './university-big-card.component.html',
  styleUrls: ['./university-big-card.component.css']
})
export class UniversityBigCardComponent implements OnInit {

  commentService:CommentService=new CommentService();
  extendedUniversity: UniversityExtendedModel = new UniversityExtendedModel();
  newComment: ReviewModel= new ReviewModel();
  userId?: number=undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: UniversityCardModel, private _universityService:UniversityCardService,private _loginService:LoginService) {
  }

  ngOnInit(): void {
    this.newComment.universityId = this.data.university_id;
    this._universityService.getExtendedUniversity(this.data.university_id).subscribe(
      (result : UniversityExtendedModel) =>{
        this.extendedUniversity=result;
      }
    );
    this._loginService.loginEvent$.subscribe(d=>{

      this.userId = d.userId;
    });
    this._loginService.getCurrentUser().subscribe(data=>{

      this.userId = data.userId;
      console.log(this.userId);

    },err=>{
      this.userId=undefined;
    })
  }

  onSubmit(){
    this.newComment.universityId = this.extendedUniversity.university_id;
    if(this.userId != undefined){
    this.newComment.userId = this.userId;
    this.newComment.universityId = this.data.university_id;
    console.log(this.newComment);

    this._universityService.postReview(this.newComment).subscribe(data =>{
      console.log(data);
      this._universityService.getExtendedUniversity(this.data.university_id).subscribe(
        (result : UniversityExtendedModel) =>{
          this.extendedUniversity=result;
        }
      );

    });
  }
    this.newComment=new ReviewModel();
    console.log(this.newComment);
    this.newComment.rating=0;

  }
  getReview(event: number){
    this.newComment.rating = event;
  }

}
