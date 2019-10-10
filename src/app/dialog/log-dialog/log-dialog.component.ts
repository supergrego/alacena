import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-log-dialog',
  templateUrl: './log-dialog.component.html',
  styleUrls: ['./log-dialog.component.css']
})
export class LogDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseExit(){
    this.dialogRef.close({action: 'exit'});
  }

}
