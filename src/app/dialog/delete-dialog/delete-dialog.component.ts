import { Component, OnInit, Injectable, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  description: string;
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.description = this.data.order.dish + (this.data.order.garrison ? " (" + this.data.order.garrison + ")" : "");
  }

  onCloseConfirm(){
    var me = this;
    this.dialogRef.close({
      action: 'confirm'});
  }

  onCloseExit(){
    this.dialogRef.close({
      action: 'exit'});
  }

}
