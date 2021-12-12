import { SurveyModel } from 'src/app/models/survey.model';
import { SortFilter } from './sort-filter.model';
export class SortingSurveyModel{
    sortFilter: SortFilter = new SortFilter();
    survey: SurveyModel = new SurveyModel();
    startingPoint : number = 0;
    maxNumber : number=6;
}