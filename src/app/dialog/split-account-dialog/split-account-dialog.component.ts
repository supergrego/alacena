import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-split-account-dialog',
  templateUrl: './split-account-dialog.component.html',
  styleUrls: ['./split-account-dialog.component.css']
})
export class SplitAccountDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SplitAccountDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseSave(){
    var me = this;
    this.dialogRef.close({
      action: 'save'});
    }

  onCloseExit(){
    this.dialogRef.close({
      action: "exit"});
  }

}
