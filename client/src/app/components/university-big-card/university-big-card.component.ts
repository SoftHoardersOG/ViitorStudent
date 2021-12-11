import { UniversityCardModel } from './../../models/university-card.model';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-university-big-card',
  templateUrl: './university-big-card.component.html',
  styleUrls: ['./university-big-card.component.css']
})
export class UniversityBigCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: UniversityCardModel) { 
  }

  ngOnInit(): void {
    
  }

}
