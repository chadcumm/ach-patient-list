import { Injectable } from '@angular/core';
import { CustomService } from '@clinicaloffice/clinical-office-mpage';

@Injectable({
  providedIn: 'root'
})
export class PopulationDataService {
  public loading_population = false;
  constructor(
    public populationData: CustomService
  ) { }


  public get patientlist(): any[] {
    return this.populationData.get('patient_population').visits;
  }
  
  // Determine if patients have been loaded
  public get patientlistLoaded(): boolean {
    return this.populationData.isLoaded('patient_population');
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

}
