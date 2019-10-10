import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-share-account-dialog',
  templateUrl: './share-account-dialog.component.html',
  styleUrls: ['./share-account-dialog.component.css']
})
export class ShareAccountDialogComponent implements OnInit {
  selectedUser: string;
  constructor(public dialogRef: MatDialogRef<ShareAccountDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseSave(){
    var me = this;
    this.dialogRef.close({
      action: 'save',
      data: me.selectedUser});
    }

  onCloseExit(){
    this.dialogRef.close({
      action: 'exit'});
  }

}
