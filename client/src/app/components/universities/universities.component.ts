import { Component, OnInit } from '@angular/core';
import { UniversityCardModel } from 'src/app/models/university-card.model';
import { UniversityCardService } from 'src/app/services/university-card.service';

@Component({
  selector: 'universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css'],
})
export class UniversitiesComponent implements OnInit {
  constructor(private universityCardService: UniversityCardService) {}

  arr: Array<UniversityCardModel> = new Array<UniversityCardModel>();
  arrMaxLength: number = 0;
  scrollY: number = 0;
  shouldRequest: boolean = true;
  windowWidth: number =0;
  universityAmount:number=0;

  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      this.windowWidth = window.innerWidth;
      this.universityAmount = this.windowWidth/200;
      let maxHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      console.log(
        this.scrollY,
        maxHeight,
        maxHeight - this.scrollY,
        this.shouldRequest,
        this.universityAmount
      );
      if (
        maxHeight - this.scrollY < 1400 &&
        this.shouldRequest &&
        this.arr.length < this.arrMaxLength
      ) {
        this.shouldRequest = false;
        this.universityCardService
          .lazyGetUniversities(this.arr.length,Math.ceil(this.universityAmount))
          .subscribe((data) => {
            this.arr = this.arr.concat(data);
            this.shouldRequest = true;
          });
      }
    });
    this.windowWidth = window.innerWidth;
    this.universityAmount = this.windowWidth/200;
    console.log(this.windowWidth,this.windowWidth/200);
    
    this.universityCardService
      .lazyGetUniversities(this.arr.length,Math.ceil(this.universityAmount))
      .subscribe((data) => {
        this.arr = this.arr.concat(data);
      });
    this.universityCardService.getUniversityCount().subscribe((data) => {
      this.arrMaxLength = data;
    });
  }
}
