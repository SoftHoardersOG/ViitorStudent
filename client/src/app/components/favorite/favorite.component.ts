import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  @Input("rating") rating:number=0;
  @Input("toggleable") toggleable:boolean=false;
  @Output("change") event = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(givenRating: number){
    if (!this.toggleable) return;
    this.rating=givenRating;
    this.event.emit(givenRating);
  }

}
