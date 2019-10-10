import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
  selector: 'app-call-dialog',
  templateUrl: './call-dialog.component.html',
  styleUrls: ['./call-dialog.component.css']
})
export class CallDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CallDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private deviceService: DeviceDetectorService) { }
  title: string;
  text: string;
  icon: string;
  isDesktop: boolean;

  ngOnInit() {
    let me = this;
    me.isDesktop = me.deviceService.isDesktop();
    me.title = me.data.title;
    me.text = me.data.text;
    me.icon = me.data.icon;
  }

  onCloseSave(){
    var me = this;
    this.dialogRef.close({
      action: 'save'});
  }

  onCloseExit(){
    this.dialogRef.close({
      action: 'exit'});
  }

}
