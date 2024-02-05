import { Component, OnInit } from '@angular/core';
import { PopulationDataService } from 'src/app/service/population-data.service';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss']
})
export class PatientTableComponent implements OnInit {

  constructor(
    public patientListDS: PopulationDataService
  ) { }

  ngOnInit(): void {
  }

}
