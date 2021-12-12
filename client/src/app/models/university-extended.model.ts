import { ReviewModel } from "./review.model";
import { UniversityCardModel } from "./university-card.model";

export class UniversityExtendedModel extends UniversityCardModel
{
  longDescription : string ="";
  examInfo : string="";
  reviews:Array<ReviewModel>=new Array<ReviewModel>();

}
