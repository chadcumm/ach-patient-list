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

  public loadPatientPopulation(): void {

    this.loading_population = true;

    this.populationData.load({
      customScript: {
        script: [
          {
            name: '1cov_base_development_01:group1',
            run: 'pre',
            id: 'patient_population'
          }
        ]
      }
    }, undefined, (() => { this.loading_population = false }));
  }

}
