import { UniversityCardModel } from './../../models/university-card.model';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { _Comment } from 'src/app/models/comment.model';
import { UniversityExtendedModel } from 'src/app/models/university-extended.model';
import { UniversityCardService } from 'src/app/services/university-card.service';

@Component({
  selector: 'app-university-big-card',
  templateUrl: './university-big-card.component.html',
  styleUrls: ['./university-big-card.component.css']
})
export class UniversityBigCardComponent implements OnInit {
  extendedUniversity:UniversityExtendedModel = new UniversityExtendedModel();
  constructor(@Inject(MAT_DIALOG_DATA) public data: UniversityCardModel, private _universityService:UniversityCardService) {

  }

  ngOnInit(): void {
    this._universityService.getExtendedUniversity(this.data.id).subscribe(
      (result : UniversityExtendedModel) =>{
        this.extendedUniversity=result;
      }
    )
  }

}
