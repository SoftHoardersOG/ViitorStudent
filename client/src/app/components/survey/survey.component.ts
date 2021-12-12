import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { CityModel } from 'src/app/models/city.model';
import { ClubModel } from 'src/app/models/club.model';
import { InterestModel } from 'src/app/models/interest.model';
import { JobModel } from 'src/app/models/job.model';
import { SubjectModel } from 'src/app/models/subject.model';
import { SurveyModel } from 'src/app/models/survey.model';
import { SurveyService } from 'src/app/services/survey.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { LoginService } from 'src/app/services/login.service';
import { AutocompleteService } from 'src/app/services/autocomplete.service';
import { debounceTime } from 'rxjs';
import { AutocompleteModel } from 'src/app/models/autocomplete.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  cities: Array<CityModel> = new Array<CityModel>();
  clubs: Array<ClubModel> = new Array<ClubModel>();
  jobs: Array<JobModel> = new Array<JobModel>();
  subjects: Array<SubjectModel> = new Array<SubjectModel>();
  interests: Array<InterestModel> = new Array<InterestModel>();

  cityOptions: Array<CityModel> = new Array<CityModel>();
  clubOptions: Array<ClubModel> = new Array<ClubModel>();
  jobOptions: Array<JobModel> = new Array<JobModel>();
  subjectOptions: Array<SubjectModel> = new Array<SubjectModel>();
  interestOptions: Array<InterestModel> = new Array<InterestModel>();

  cityControl: FormControl = new FormControl();
  clubControl: FormControl = new FormControl();
  jobControl: FormControl = new FormControl();
  subjectControl: FormControl = new FormControl();
  interestControl: FormControl = new FormControl();

  survey: SurveyModel = new SurveyModel();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  constructor(
    private _surveyService: SurveyService,
    private _loginService: LoginService,
    private _autocompleteService: AutocompleteService,
    private _snackBar: MatSnackBar
  ) {}
  @ViewChild('cityInput') cityInput: any;
  @ViewChild('clubInput') clubInput: any;
  @ViewChild('jobInput') jobInput: any;
  @ViewChild('subjectInput') subjectInput: any;
  @ViewChild('interestInput') interestInput: any;

  ngOnInit(): void {

    this._surveyService
      .getAllCities()
      .subscribe((data) => (this.cityOptions = this.cities = data));
    this._surveyService
      .getAllClubs()
      .subscribe((data) => (this.clubOptions = this.clubs = data));
    this._surveyService
      .getAllJobs()
      .subscribe((data) => (this.jobOptions = this.jobs = data));
    this._surveyService
      .getAllInterests()
      .subscribe((data) => (this.interestOptions = this.interests = data));
    this._surveyService
      .getAllSubjects()
      .subscribe((data) => (this.subjectOptions = this.subjects = data));

    this._loginService.getCurrentUser().subscribe((data:UserModel) => {
      if(data.userId)
      this.survey.userId = data.userId;
    } );


    // -------------------SUBSCRIBERS----------------------------------------------------
    this.cityControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((key: string) => {
        console.log(key);
        if (Number.parseInt(key)) {
          key = '';
        }
        let autMod = new AutocompleteModel(key.toString(), this.survey.cityIds);
        this._autocompleteService
          .getOptionAutocomplete<CityModel>(autMod, 'city')
          .subscribe((newOptions: Array<CityModel>) => {
            this.cityOptions = newOptions;
          });
      });

    this.clubControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((key: string) => {
        console.log(key);
        if (Number.parseInt(key)) {
          key = '';
        }
        let autMod = new AutocompleteModel(key.toString(), this.survey.clubIds);
        this._autocompleteService
          .getOptionAutocomplete<ClubModel>(autMod, 'club')
          .subscribe((newOptions: Array<ClubModel>) => {
            this.clubOptions = newOptions;
          });
      });

    this.jobControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((key: string) => {
        console.log(key);
        if (Number.parseInt(key)) {
          key = '';
        }
        let autMod = new AutocompleteModel(key.toString(), this.survey.jobIds);
        this._autocompleteService
          .getOptionAutocomplete<JobModel>(autMod, 'job')
          .subscribe((newOptions: Array<JobModel>) => {
            this.jobOptions = newOptions;
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
          this.survey.subjectIds
        );
        this._autocompleteService
          .getOptionAutocomplete<CityModel>(autMod, 'subject')
          .subscribe((newOptions: Array<SubjectModel>) => {
            this.subjectOptions = newOptions;
          });
      });

    this.interestControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((key: string) => {
        console.log(key);
        if (Number.parseInt(key)) {
          key = '';
        }
        let autMod = new AutocompleteModel(
          key.toString(),
          this.survey.interestIds
        );
        this._autocompleteService
          .getOptionAutocomplete<InterestModel>(autMod, 'interest')
          .subscribe((newOptions: Array<InterestModel>) => {
            this.interestOptions = newOptions;
          });
      });
    // ---------------------------------------------------------------------------------------------
  }
  submitForm(){
    this._surveyService.postSurvey(this.survey).subscribe(data=>
      this._snackBar.open("Sondaj adaugat cu succes!","",{duration:2000,panelClass: ['mat-toolbar','mat-accent']}),err=>
      this._snackBar.open("A aparut o eroare in adaugarea sondajului!","",{duration:2000,panelClass: ['mat-toolbar','mat-warn']})
      );
  }

  //-----------------------------------------GETNAME-----------------------------------------------
  getCityName(cityId: number): string {
    let city = this.cities.find((c) => c.id == cityId);
    if (city) {
      return city.name;
    }
    return '';
  }
  getClubName(clubId: number): string {
    let club = this.clubs.find((c) => c.id == clubId);
    if (club) {
      return club.name;
    }
    return '';
  }
  getJobName(jobId: number): string {
    let job = this.jobs.find((j) => j.id == jobId);
    if (job) {
      return job.name;
    }
    return '';
  }
  getInterestName(interestId: number): string {
    let interest = this.interests.find((i) => i.id == interestId);
    if (interest) {
      return interest.name;
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

  //-----------------------------------------------------------------------------------------------


  //--------------------------------------REMOVERS------------------------------------------------
  removeCity(cityId: number): void {
    this.survey.cityIds = this.survey.cityIds.filter((c) => c != cityId);
    this.cityControl.setValue('', { emitEvent: true });
  }
  removeClub(clubId: number): void {
    this.survey.clubIds = this.survey.clubIds.filter((c) => c != clubId);
    this.clubControl.setValue('', { emitEvent: true });
  }
  removeJob(jobId: number): void {
    this.survey.jobIds = this.survey.jobIds.filter((j) => j != jobId);
    this.jobControl.setValue('', { emitEvent: true });
  }
  removeSubject(subjectId: number): void {
    this.survey.cityIds = this.survey.subjectIds.filter((c) => c != subjectId);
    this.subjectControl.setValue('', { emitEvent: true });
  }
  removeInterest(interestId: number): void {
    this.survey.interestIds = this.survey.interestIds.filter((i) => i != interestId);
    this.interestControl.setValue('', { emitEvent: true });
  }
  // -----------------------------------------------------------------------------------------------

  // ---------------------------------ADDERS------------------------------------------------------
  addCity(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let city = this.cities.find(
      (c) => c.name.toLowerCase() == value.toLowerCase()
    );
    if (city && !this.survey.cityIds.includes(city.id)) {
      this.survey.cityIds.push(city.id);
    }
    event.chipInput!.clear();

    this.cityControl.setValue(null);
  }
  addJob(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let job = this.jobs.find(
      (j) => j.name.toLowerCase() == value.toLowerCase()
    );
    if (job && !this.survey.jobIds.includes(job.id)) {
      this.survey.jobIds.push(job.id);
    }
    event.chipInput!.clear();

    this.jobControl.setValue(null);
  }
  addClub(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let club = this.clubs.find(
      (c) => c.name.toLowerCase() == value.toLowerCase()
    );
    if (club && !this.survey.clubIds.includes(club.id)) {
      this.survey.clubIds.push(club.id);
    }
    event.chipInput!.clear();

    this.clubControl.setValue(null);
  }
// INTEREST
  addInterest(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let interest = this.interests.find(
      (i) => i.name.toLowerCase() == value.toLowerCase()
    );
    if (interest && !this.survey.interestIds.includes(interest.id)) {
      this.survey.interestIds.push(interest.id);
    }
    event.chipInput!.clear();

    this.interestControl.setValue(null);
  }
  // SUBJECT
  addSubject(event: MatChipInputEvent): void {
    const value = event.value;
    console.log(value);
    let subject = this.subjects.find(
      (c) => c.name.toLowerCase() == value.toLocaleLowerCase()
    );
    if (subject && !this.survey.subjectIds.includes(subject.id)) {
      this.survey.subjectIds.push(subject.id);
    }
    event.chipInput!.clear();

    this.subjectControl.setValue(null);
  }
  //-------------------------------------------------------------------

  // ------------------SELECTORS----------------------------------------
  selectedCity(event: MatAutocompleteSelectedEvent): void {
    console.log(this.survey);
    var city_id = Number.parseInt(event.option.value);
    if (!this.survey.cityIds.includes(city_id)) {
      this.survey.cityIds.push(city_id);
    }
    this.cityInput.nativeElement.value = '';
    console.log(this.cityOptions);

    this.cityInput?.nativeElement.blur();
  }
  //CLUB
  selectedClub(event: MatAutocompleteSelectedEvent): void {
    console.log(this.survey);
    var club_id = Number.parseInt(event.option.value);
    if (!this.survey.clubIds.includes(club_id)) {
      this.survey.clubIds.push(club_id);
    }
    this.clubInput.nativeElement.value = '';
    console.log(this.clubOptions);

    this.clubInput?.nativeElement.blur();
  }
  //JOB
  selectedJob(event: MatAutocompleteSelectedEvent): void {
    console.log(this.survey);
    var job_id = Number.parseInt(event.option.value);
    if (!this.survey.jobIds.includes(job_id)) {
      this.survey.jobIds.push(job_id);
    }
    this.jobInput.nativeElement.value = '';
    console.log(this.jobOptions);

    this.jobInput?.nativeElement.blur();
  }

  //SUBJECT
  selectedSubject(event: MatAutocompleteSelectedEvent): void {
    console.log(this.survey);
    var subject_id = Number.parseInt(event.option.value);
    if (!this.survey.subjectIds.includes(subject_id)) {
      this.survey.subjectIds.push(subject_id);
    }
    this.subjectInput.nativeElement.value = '';
    console.log(this.subjectOptions);

    this.subjectInput?.nativeElement.blur();
  }

  //INTEREST
  selectedInterest(event: MatAutocompleteSelectedEvent): void {
    console.log(this.survey);
    var interest_id = Number.parseInt(event.option.value);
    if (!this.survey.interestIds.includes(interest_id)) {
      this.survey.interestIds.push(interest_id);
    }
    this.interestInput.nativeElement.value = '';
    console.log(this.interestOptions);

    this.interestInput?.nativeElement.blur();
  }
    // ---------------------------------------------------------------------

}
