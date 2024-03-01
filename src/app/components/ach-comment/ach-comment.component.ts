import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ach-comment',
  templateUrl: './ach-comment.component.html',
  styleUrls: ['./ach-comment.component.scss']
})
export class AchCommentComponent implements OnInit {

  ach_comment = '';

  constructor(
    private ACHCommentDialogRef: MatDialogRef<AchCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    //this.comment = this.data
    console.log(this.data)
  }

  saveComment() {
    // Save the comment to the database here
  
    // Close the dialog and pass the comment
    console.log(`before close: ` + this.ach_comment)
    this.ACHCommentDialogRef.close(this.ach_comment);
  }

  cancel() {
    // Close the dialog without passing any data
    this.ACHCommentDialogRef.close();
  }

}
