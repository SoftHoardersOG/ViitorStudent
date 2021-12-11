import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { AuthInterceptor } from 'src/interceptor/auth.interceptor';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from './components/university-card/university-card.component';
import { MatCardModule } from '@angular/material/card';
import { UniversitiesComponent } from './components/universities/universities.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { SurveyComponent } from './components/survey/survey.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    MainComponent,
    RegistrationFormComponent,
    LoginFormComponent,
    NavbarComponent,
    LandingComponent,
    AboutUsComponent,
    CardComponent,
    UniversitiesComponent,
    SurveyComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatRadioModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [MainComponent],
})
export class AppModule {}
