import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  value=0;
  index=1;
  questions:Array<any>=[
    {id: 1,
     title: "mil sugi",
     options:[{id: 1, text: "da"}, {id: 2, text: "cum sa nu"}]
    },
    {id: 2,
      title: "Intrebarea2",
      options:[{id: 1, text: "Optiunea1"}, {id: 2, text: "Optiunea2"}, {id: 3, text: "Optiunea3"}, {id: 4, text: "Optiunea4"}, {id: 5, text: "Optiunea5"}]
     },
     {id: 3,
      title: "Intrebarea3",
      options:[{id: 1, text: "Optiunea1"}, {id: 2, text: "Optiunea2"}]
     }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  goForward(){
    this.index++;
  }
  goBack(){
    this.index--;
  }
  onSubmit(){
    console.log("survey submitted");
  }
}
