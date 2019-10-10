import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-roles-dialog',
  templateUrl: './roles-dialog.component.html',
  styleUrls: ['./roles-dialog.component.css']
})
export class RolesDialogComponent implements OnInit {
  disableAdmin = false;
  firstFloor: string;
  constructor(public dialogRef: MatDialogRef<RolesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    let me = this;
    me.disableAdmin = me.data.email === 'supergrego@gmail.com'
    me.firstFloor = me.data.firstFloor ? "1" : "4";
  }

  adminChange(){
    let me = this;
    me.data.roles.admin = !me.data.roles.admin;
  }

  callerChange(){
    let me = this;
    me.data.roles.caller = !me.data.roles.caller;
  }

  acountantChange(){
    let me = this;
    me.data.roles.accountant = !me.data.roles.accountant;
  }

  floorChanged(event){
    var me = this;
    me.data.roles.firstFloor = event.value === "1";
  }

  onCloseSave(){
    this.dialogRef.close({action: 'save', roles: this.data.roles});
  }

  onCloseExit(){
    this.dialogRef.close({action: 'exit'});
  }

}
