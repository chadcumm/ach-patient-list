import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClinicalOfficeMpageModule} from "@clinicaloffice/clinical-office-mpage";
import {MaterialModule} from "@clinicaloffice/clinical-office-mpage";
import {ErrorHandlerService} from "@clinicaloffice/clinical-office-mpage";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { ComponentVersionComponent } from './components/component-version/component-version.component';
import { PatientTableComponent } from './components/patient-table/patient-table.component';
import { AchCommentComponent } from './components/ach-comment/ach-comment.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AchToolbarComponent } from './components/ach-toolbar/ach-toolbar.component';
@NgModule({
  declarations: [
    AppComponent,
    ComponentVersionComponent,
    PatientTableComponent,
    AchCommentComponent,
    AchToolbarComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    ClinicalOfficeMpageModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatDialogModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'MM-DD-YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
