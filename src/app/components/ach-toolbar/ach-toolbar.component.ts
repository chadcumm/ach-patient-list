import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck  } from '@angular/core';
import { PopulationDataService } from 'src/app/service/population-data.service';
import { mPageService } from '@clinicaloffice/clinical-office-mpage';
@Component({
  selector: 'app-ach-toolbar',
  templateUrl: './ach-toolbar.component.html',
  styleUrls: ['./ach-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AchToolbarComponent implements OnInit, DoCheck {

  constructor(
    public patientListDS: PopulationDataService,
    public patientListCdr: ChangeDetectorRef,
    public mPage: mPageService
  ) { }


  ngDoCheck(): void {
    if (this.patientListDS.population_refereshed === true) {
      setTimeout(() => {
        this.patientListDS.population_refereshed = false;
        this.mPage.putLog('Patient Table Refreshed-AchToolbarComponent:ngDoCheck');
        this.patientListCdr.detectChanges();
      });
    }
  }

  ngOnInit(): void {
  }

}
