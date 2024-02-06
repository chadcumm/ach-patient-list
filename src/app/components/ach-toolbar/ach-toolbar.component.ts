import { Component, OnInit } from '@angular/core';
import { PopulationDataService } from 'src/app/service/population-data.service';
@Component({
  selector: 'app-ach-toolbar',
  templateUrl: './ach-toolbar.component.html',
  styleUrls: ['./ach-toolbar.component.scss']
})
export class AchToolbarComponent implements OnInit {

  constructor(
    public patientListDS: PopulationDataService
  ) { }

  ngOnInit(): void {
  }

}
