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
  this.mPage.putLog(`Save Preferences ${JSON.stringify(this.ACHColumnConfig)}`);
  this.snackBar.open('Preferences Saved', 'Close', {duration: 2000});
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
    }, undefined, (() => { this.loading_population = false }));
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
        },
        (error: any) => {
          console.error('Error loading patient population:', error);
          this.loading_population = false;
        }
      );
  }


}
