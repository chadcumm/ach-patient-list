import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { PopulationDataService } from 'src/app/service/population-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MPageConfirmComponent, mPageService } from '@clinicaloffice/clinical-office-mpage';
import { AchCommentComponent } from '../ach-comment/ach-comment.component';
@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientTableComponent implements OnInit, DoCheck {

  constructor(
    public patientListDS: PopulationDataService,
    public mPage: mPageService,
    public dialog: MatDialog,
    public patientListCdr: ChangeDetectorRef
  ) { }
  ngDoCheck(): void {
    if (this.patientListDS.population_refereshed === true) {
      setTimeout(() => {
        this.patientListDS.population_refereshed = false;
        this.mPage.putLog('Patient Table Refreshed-PatientTableComponent:ngDoCheck');
        this.patientListCdr.detectChanges();
      });

    }
  }

  ngOnInit(): void {
   
  }




  public cellColumnClick(event: any): void {
    //console.log('Cell Column Click:', event);

    switch (event.column) {
      case 'patientName':
        //console.log('Patient Name Clicked:', event.row);
        this.CernerApplicationAction('OPENCHART', event.row);
        break;
      case 'rnComment':
      case 'drComment':
        this.openCommentForm(event);
        break;
      default:
        /*
        const dialogRef = this.dialog.open(MPageConfirmComponent, {
          width: '500px',
          data: {
              title: 'Cell Column Click',
              text: JSON.stringify(event),
              icon: 'info'
          }
        });
        */
        break;
    }
  }
 
  openCommentForm(event: any) {
    const dialogConfig = new MatDialogConfig();

    //create an object that will hold meta data about the comment to be passed to the dialog.  including the comment title
    const commentMeta = {
      title: 'RN Comment',
    }

    if (event.column ===  'rnComment') {
      commentMeta.title = 'RN Comment';
    } else if (event.column === 'drComment') {
      commentMeta.title = 'Dr Comment';
    }
    // Pass the commentMeta object to the dialog and the event data
    dialogConfig.data = {commentMeta, event};

    const dialogRef = this.dialog.open(AchCommentComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(ReturnComment => {
      this.mPage.putLog(`${commentMeta.title}: ${ReturnComment} for encntrId: ${event.encntrId} and personId: ${event.personId}`);
      // Here you can handle the comment
      this.patientListDS.updateACHComment(ReturnComment, event.encntrId);
      
    });
  }

  public cellContextMenu(event: any): void {
    if (event.contextMenuAction) {
      this.mPage.putLog('Context Menu Click:', JSON.stringify(event));
      switch (event.contextMenuAction) {
        case 'Clinical Stability Tool':
          this.OpenScreeningTool(event.hiddenData.cstPowerformId, event);
          break;
        case 'Social Stability Tool':
          this.OpenScreeningTool(event.hiddenData.sstPowerformId, event);
          break;
        case 'Add Note':
          this.openCommentForm(event);
          break;
        default:
          const dialogRef = this.dialog.open(MPageConfirmComponent, {
            width: '500px',
            data: {
                title: 'Context Menu Click',
                text: JSON.stringify(event),
                icon: 'info'
            }
          });
          break;
      }
    }
  }

  OpenScreeningTool(form: number, data: any) {
    
    this.mPage.putLog('OpenScreeningTool:  data.encntrId: ' + data.encntrId + ' data.personId: ' + data.personId + ' form: ' + form)
    // @ts-ignore
    const d = window.external.DiscernObjectFactory('POWERFORM');
    d.OpenForm(data.personId, data.encntrId, form, 0.0, 0);
  }


  CernerApplicationAction(action: string, data: any): void {
    this.mPage.putLog('action: ' + action + ' data.encntrId: ' + data.encntrId + ' data.personId: ' + data.personId)
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
