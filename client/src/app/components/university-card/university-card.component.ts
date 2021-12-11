import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'university-card',
  templateUrl: './university-card.component.html',
  styleUrls: ['./university-card.component.css']
})
export class CardComponent implements OnInit {

  @Input() name:string =""
  @Input() group:string="";
  @Input() shortDescription:string="";
  @Input() phoneNumber:string="";
  @Input() address:string="";
  @Input() email:string="";
  @Input() imageUrl:string="";

  constructor() { }

  ngOnInit(): void {
  }

}
