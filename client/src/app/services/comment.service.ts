import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}
  getComments(){
      ///chestii complicate https nu stiu 
      return [{userName:"Username", title: "Lorem Ipsum Dolor", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut purus quis nisl pharetra pulvinar. Etiam in erat nec tellus porttitor lacinia. Sed et justo in nisi dapibus hendrerit eu ac libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut commodo lectus. Proin ornare, nibh ac bibendum tempor, leo lacus pretium ex, eget finibus nunc nulla nec ipsum. Mauris tempus metus suscipit, fermentum libero eu, vulputate odio.", rating: 3},
              {userName:"Username", title: "Lorem Ipsum Dolor", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut purus quis nisl pharetra pulvinar. Etiam in erat nec tellus porttitor lacinia. Sed et justo in nisi dapibus hendrerit eu ac libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut commodo lectus. Proin ornare, nibh ac bibendum tempor, leo lacus pretium ex, eget finibus nunc nulla nec ipsum. Mauris tempus metus suscipit, fermentum libero eu, vulputate odio.", rating: 1},
              {userName:"Username", title: "Lorem Ipsum Dolor", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut purus quis nisl pharetra pulvinar. Etiam in erat nec tellus porttitor lacinia. Sed et justo in nisi dapibus hendrerit eu ac libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut commodo lectus. Proin ornare, nibh ac bibendum tempor, leo lacus pretium ex, eget finibus nunc nulla nec ipsum. Mauris tempus metus suscipit, fermentum libero eu, vulputate odio.", rating: 4}
             ]
  }
}
