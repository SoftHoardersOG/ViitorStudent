import { SortingSurveyModel } from './../../models/sorting-survey.model';
import { SubjectModel } from 'src/app/models/subject.model';
import { InterestModel } from 'src/app/models/interest.model';
import { AutocompleteService } from 'src/app/services/autocomplete.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SurveyModel } from 'src/app/models/survey.model';
import { LoginService } from 'src/app/services/login.service';
import { CityModel } from 'src/app/models/city.model';
import { SurveyService } from 'src/app/services/survey.service';
import { SortFilter } from './../../models/sort-filter.model';
import { UniversityBigCardComponent } from '../university-big-card/university-big-card.component';
import { UniversityCardModel } from './../../models/university-card.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UniversityCardService } from 'src/app/services/university-card.service';
import { UserModel } from 'src/app/models/user.model';
import { debounceTime } from 'rxjs';
import { AutocompleteModel } from 'src/app/models/autocomplete.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'universities',
  templateUrl: './universities.component.html',
  styleUrls: ['./universities.component.css'],
})
export class UniversitiesComponent implements OnInit {
  constructor(
    private universityCardService: UniversityCardService,
    public _dialog: MatDialog,
    private _surveyService: SurveyService,
    private _loginService: LoginService,
    private _autocompleteService: AutocompleteService,
    private _snackBar: MatSnackBar
  ) {}

  @ViewChild('cityInput') cityInput: any;
  @ViewChild('subjectInput') subjectInput: any;
  separatorKeysCodes: number[] = [ENTER, COMMA];

  enableForm: boolean = true;
  descendingOrder: boolean = false;
  arr: Array<UniversityCardModel> = new Array<UniversityCardModel>();
  arrMaxLength: number = 0;
  scrollY: number = 0;
  shouldRequest: boolean = true;
  windowWidth: number = 0;
  universityAmount: number = 0;

  cityControl: FormControl = new FormControl();
  cityOptions: Array<CityModel> = new Array();
  cities: Array<CityModel> = new Array();

  sortFilter: SortFilter = new SortFilter();
  surveyModel?: SurveyModel = undefined;

  subjects: Array<SubjectModel> = new Array();
  subjectControl: FormControl = new FormControl();
  subjectOptions: Array<SubjectModel> = new Array();
  sortingSurvey: SortingSurveyModel = new SortingSurveyModel();

  ngOnInit(): void {

   this._surveyService.$surveyChanged.subscribe(data=> {this.surveyModel=data, this.submitForm()})

    this._surveyService
      .getAllCities()
      .subscribe((data) => (this.cityOptions = this.cities = data));
    this._surveyService
      .getAllSubjects()
      .subscribe((data) => (this.subjectOptions = this.subjects = data));

    this.cityControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((key: string) => {
        console.log(key);
        if (Number.parseInt(key)) {
          key = '';
        }
        let autMod = new AutocompleteModel(
          key.toString(),
          this.sortFilter.cities
        );
        this._autocompleteService
          .getOptionAutocomplete<CityModel>(autMod, 'city')
          .subscribe((newOptions: Array<CityModel>) => {
            this.cityOptions = newOptions;
          });
      });
    this.subjectControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((key: string) => {
        console.log(key);
        if (Number.parseInt(key)) {
          key = '';
        }
        let autMod = new AutocompleteModel(
          key.toString(),
          this.sortFilter.subjects
        );
        this._autocompleteService
          .getOptionAutocomplete<CityModel>(autMod, 'subject')
          .subscribe((newOptions: Array<SubjectModel>) => {
            this.subjectOptions = newOptions;
          });
      });

    document.addEventListener('scroll', () => {
      this.scrollY = window.scrollY;
      this.windowWidth = window.innerWidth;
      this.universityAmount = this.windowWidth / 200;
      let maxHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      if (
        maxHeight - this.scrollY < 1400 &&
        this.shouldRequest &&
        this.arr.length < this.arrMaxLength
      ) {
        this.shouldRequest = false;
        this.sortingSurvey.maxNumber = Math.ceil(this.universityAmount);
        this.sortingSurvey.startingPoint = this.arr.length;
        console.log(this.sortingSurvey);
        this._surveyService
          .getUniversities(this.sortingSurvey)
          .subscribe((data) => {
            console.log(data);
            this.arr = this.arr.concat(data);
            this.shouldRequest = true;
          });

      }
    });
    this.windowWidth = window.innerWidth;
    this.universityAmount = this.windowWidth / 200;
    console.log(this.windowWidth, this.windowWidth / 200);

    this.updateFilterModel();
    this.universityCardService.getUniversityCount().subscribe((data) => {
      this.arrMaxLength = data;
    });
  }

  showBig(university: UniversityCardModel) {
    let dialogref = this._dialog.open(UniversityBigCardComponent, {
      data: university,
      width: '65%',
      height: 'fit-content',
    });
  }

  getCityName(cityId: number): string {
    let city = this.cities.find((c) => c.id == cityId);
    if (city) {
      return city.name;
    }
    return '';
  }
  getSubjectName(subjectId: number): string {
    let subject = this.subjects.find((s) => s.id == subjectId);
    if (subject) {
      return subject.name;
    }
    return '';
  }

  removeCity(cityId: number): void {
    this.sortFilter.cities = this.sortFilter.cities.filter((c) => c != cityId);
    this.cityControl.setValue('', { emitEvent: true });
  }
  removeSubject(subjectId: number): void {
    this.sortFilter.subjects = this.sortFilter.subjects.filter(
      (c) => c != subjectId
    );
    this.subjectControl.setValue('', { emitEvent: true });
  }

  addCity(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let city = this.cities.find(
      (c) => c.name.toLowerCase() == value.toLowerCase()
    );
    if (city && !this.sortFilter.cities.includes(city.id)) {
      this.sortFilter.cities.push(city.id);
    }
    event.chipInput!.clear();

    this.cityControl.setValue(null);
  }
  addSubject(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let subject = this.subjects.find(
      (c) => c.name.toLowerCase() == value.toLocaleLowerCase()
    );
    if (subject && !this.sortFilter.subjects.includes(subject.id)) {
      this.sortFilter.subjects.push(subject.id);
    }
    event.chipInput!.clear();

    this.subjectControl.setValue(null);
  }

  selectedCity(event: MatAutocompleteSelectedEvent): void {
    var city_id = Number.parseInt(event.option.value);
    if (!this.sortFilter.cities.includes(city_id)) {
      this.sortFilter.cities.push(city_id);
    }
    this.cityInput.nativeElement.value = '';
    console.log(this.cityOptions);

    this.cityInput?.nativeElement.blur();
  }
  selectedSubject(event: MatAutocompleteSelectedEvent): void {
    var subject_id = Number.parseInt(event.option.value);
    if (!this.sortFilter.subjects.includes(subject_id)) {
      this.sortFilter.subjects.push(subject_id);
    }
    this.subjectInput.nativeElement.value = '';
    console.log(this.subjectOptions);

    this.subjectInput?.nativeElement.blur();
  }
  updateFilterModel():void{
    console.log(this.enableForm);

    this._surveyService.getSurvey().subscribe((data) => {
      this.arr = new Array();
      this.sortingSurvey.sortFilter = this.sortFilter;
      if (this.enableForm) this.sortingSurvey.survey = data;
      else this.sortingSurvey.survey = new SurveyModel();
      this.sortingSurvey.startingPoint=0;

    },
    (err)=>
    {
      this.arr = new Array();
      this.sortingSurvey.sortFilter = this.sortFilter;
    });
  }
  submitForm() {
    this.updateFilterModel();
  }

  }
