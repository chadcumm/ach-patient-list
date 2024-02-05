import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PopulationDataService {
  public loading_population = false;
  private localJSONData: any[] | undefined;

  constructor(private http: HttpClient) { 
    this.loadPatientPopulation();
  }

  public get patientlist(): any[] {
    console.log('patientlist:', this.localJSONData);
    return this.localJSONData?.[0]?.visits || [];
  }
  
  // Determine if patients have been loaded
  public get patientlistLoaded(): boolean {
    return !!this.localJSONData;
  }

  public loadPatientPopulation(): void {
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
