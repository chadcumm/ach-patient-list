import { Component, OnInit } from '@angular/core';
import { PopulationDataService } from 'src/app/service/population-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MPageConfirmComponent } from '@clinicaloffice/clinical-office-mpage';
@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss']
})
export class PatientTableComponent implements OnInit {

  constructor(
    public patientListDS: PopulationDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  public cellColumnClick(event: any): void {
    console.log('Cell Column Click:', event);

    if (event.column === 'patientName') {
      console.log('Patient Name Clicked:', event.row);
      this.CernerApplicationAction('OPENCHART', event.row)
    } else {

      const dialogRef = this.dialog.open(MPageConfirmComponent, {
        width: '500px',
        data: {
            title: 'Cell Column Click',
            text: JSON.stringify(event),
            icon: 'info'
        }
      });
    }
  }
 

  public cellContextMenu(event: any): void {
    console.log('Cell Row Click:', event);
    if (event.contextMenuAction) {
      const dialogRef = this.dialog.open(MPageConfirmComponent, {
        width: '500px',
        data: {
            title: 'Row Column Click',
            text: JSON.stringify(event),
            icon: 'info'
        }
      });
    }
  }

  CernerApplicationAction(action: string, data: any): void {
    console.log('action: ' + action + 'data.encntrId: ' + data.encntrId + ' data.personId: ' + data.personId)
    if (data.encntrId && data.personId) {
      const el = document.getElementById('CernerAppLink');

      switch (action) {
        case 'OPENCHART':
          if (data.personId !== undefined && data.encntrId !== undefined) {
            // @ts-ignore
            el.href = 'javascript:APPLINK(0,"Powerchart.exe","/PERSONID=' + data.personId + ' /ENCNTRID=' + data.encntrId + '")';

          } else if (data.personId !== undefined) {
            // @ts-ignore
            el.href = 'javascript:APPLINK(0,"Powerchart.exe","/PERSONID=' + data.personId + '")';
          }

          // @ts-ignore
          el.click();

          break;
        default:
          alert('The action ' + action + ' has not been defined.');
          break;
      }
    }
  }
}
