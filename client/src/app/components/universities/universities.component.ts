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

  ngOnInit(): void {
    document.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
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
        this.shouldRequest
      );
      if (
        maxHeight - this.scrollY < 1200 &&
        this.shouldRequest &&
        this.arr.length < this.arrMaxLength
      ) {
        this.shouldRequest = false;
        this.universityCardService
          .lazyGetUniversities(this.arr.length)
          .subscribe((data) => {
            this.arr = this.arr.concat(data);
            this.shouldRequest = true;
          });
      }
    });
    this.universityCardService
      .lazyGetUniversities(this.arr.length)
      .subscribe((data) => {
        this.arr = this.arr.concat(data);
      });
    this.universityCardService.getUniversityCount().subscribe((data) => {
      this.arrMaxLength = data;
    });
  }
}
