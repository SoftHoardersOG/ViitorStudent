import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor() {}
  getComments(){
      ///chestii complicate https nu stiu 
      return [{userName:"pisat", content: "lorem ipsum dolor"}, {userName:"cacat", content: "lorem ipsum dolor scandal pe mese arabe"}]
  }
  
  
}
