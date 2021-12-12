import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}
  getComments(){
      ///chestii complicate https nu stiu 
      return [{userName:"pisat", title: "cacat", content: "lorem ipsum dolor", rating: 3},{userName:"pisat", title: "cacat", content: "lorem ipsum dolor", rating: 3},{userName:"pisat", title: "cacat", content: "lorem ipsum dolor", rating: 3}]
  }
  
  
}
