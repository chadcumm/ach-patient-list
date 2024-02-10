import { Injectable, OnInit } from '@angular/core';
import { CustomService, mPageService, IColumnConfig } from '@clinicaloffice/clinical-office-mpage';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class PopulationDataService implements OnInit {
  public loading_population = false;
  public population_refereshed = false;

  public ACHColumnConfig: IColumnConfig = {columns: [], columnSort: [], freezeLeft: 0};

  private localJSONData: any[] | undefined;

  constructor(
    public populationData: CustomService,
    public mPage: mPageService,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { 
    // moving to NgOnInit 
    //this.loadLocalPatientPopulation();
  }

  ngOnInit(): void {
    // moved to app.component.ts ngoninit
    /*
    if (this.mPage.inMpage === false) {
      this.loadLocalPatientPopulation();
    }
    */
  }

public savePreferences(): void {
  this.mPage.putLog(`Save Preferences for ${this.populationData.mpage.prsnlId} ${JSON.stringify(this.ACHColumnConfig)}`);
  if (this.mPage.inMpage === true) {
    this.populationData.executeDmInfoAction('saveUserPrefs', 'w', [
      {
        infoDomain: 'COV ACH Patient List Preferences',
        infoName: 'column_prefs',
        infoDate: new Date(),
        infoChar: '',
        infoNumber: 0,
        infoLongText: JSON.stringify({
          columnConfig: this.ACHColumnConfig
        }),
        infoDomainId: this.populationData.mpage.prsnlId
      }
    ], () => {
      this.snackBar.open('Saved Preferences.', 'Ok', {duration: 1000});
    });
  } else {
  this.snackBar.open('Preferences Would Be Saved', 'Close', {duration: 2000});
  }
}

// use this function to load th patient data
public MasterLoadPatientData(): void {
  this.mPage.putLog('MasterLoadPatientData');
  if (this.mPage.inMpage === true) {
    this.loadPatientPopulation();
  } else {
    this.loadLocalPatientPopulation();
  }
}

// Load user preferences
public loadPreferences(): void {
  this.loading_population = true;

  const prefMessage = this.populationData.emptyDmInfo;
  prefMessage.infoDomain = 'COV ACH Patient List Preferences';
  prefMessage.infoName = 'column_prefs';
  prefMessage.infoDomainId = this.populationData.mpage.prsnlId

  this.populationData.executeDmInfoAction('userPrefs', 'r', [ prefMessage ], () => {

    // Check for user preferences and assign them
    if (this.populationData.isLoaded('userPrefs')) {
      const LoadedConfig = JSON.parse(this.populationData.get('userPrefs').dmInfo[0].longText);
      this.ACHColumnConfig = LoadedConfig.columnConfig;
      this.mPage.putLog(`Loaded Preferences for ${this.populationData.mpage.prsnlId} ${JSON.stringify(this.ACHColumnConfig)}`);
    }

    this.loadPatientPopulation()
  });
}
  public get patientlist(): any[] {
    if (this.mPage.inMpage === true) {
      return this.populationData.get('patient_population').visits;
    } else {
      //console.log('patientlist:', this.localJSONData);
      return this.localJSONData?.[0]?.visits || [];
    }
  }

  public updatePatientName(patientName: string, encntrId: number) {
    let patientList: any[];
    if (this.mPage.inMpage === true) {
      patientList = this.populationData.get('patient_population').visits;
    } else {
      patientList = this.localJSONData?.[0]?.visits || [];
    }
    patientList.forEach((visit: any) => {
      if (visit.encntrId === encntrId) {
        visit.patientName = patientName;
      }
    });
  }

  public updateACHComment(NewACHComment: string, encntrId: number) {
    let patientList: any[];
    if (this.mPage.inMpage === true) {
      patientList = this.populationData.get('patient_population').visits;
    } else {
      patientList = this.localJSONData?.[0]?.visits || [];
    }
    patientList.forEach((visit: any) => {
      if (visit.encntrId === encntrId) {
        visit.achComment = NewACHComment;
      }
    });
  }
  
  // Determine if patients have been loaded
  public get patientlistLoaded(): boolean {
    if (this.mPage.inMpage === true) {
      return this.populationData.isLoaded('patient_population');
    } else {
      return !!this.localJSONData;
    }
  }

  public loadPatientPopulation(): void {

    this.loading_population = true;

    this.populationData.load({
      customScript: {
        script: [
          {
            name: 'cov_ach_pat_population:group1',
            run: 'pre',
            id: 'patient_population'
          }
        ],
        clearPatientList: true
      }
    }, undefined, (() => { 
      this.loading_population = false 
      this.population_refereshed = true;  
    }));
  }

  // load the patient data from a local JSON file.  Useful when doing offline development.  Add the json to a patient_population.json file in the assests/data folder
  // and then run the util/scramle_data.js to scramble the data and create a scrambled_patient_population.json file. Delete the patient_population.json file.

  public loadLocalPatientPopulation(): void {
    this.loading_population = true;

    this.http.get('assets/data/scrambled_patient_population.json', { responseType: 'text' })
      .pipe(
        map((response: string) => JSON.parse(response))
      )
      .subscribe(
        (data: any) => {
          this.localJSONData = [data];
          this.loading_population = false;
          this.population_refereshed = true;  
        },
        (error: any) => {
          console.error('Error loading patient population:', error);
          this.loading_population = false;
          
        }
      );
  }


}
