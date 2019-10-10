import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-money-dialog',
  templateUrl: './money-dialog.component.html',
  styleUrls: ['./money-dialog.component.css']
})
export class MoneyDialogComponent implements OnInit {
  foodCoin: FormGroup;
  isDesktop: boolean;
  constructor(public dialogRef: MatDialogRef<MoneyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, fb: FormBuilder,
              private deviceService: DeviceDetectorService) { 
                this.foodCoin = fb.group({
                  delivered: 0,
                  amount: 0,
                  returned: 0,
                  comment: ""
                });
              }

  ngOnInit() {
    let me = this;
    me.isDesktop = me.deviceService.isDesktop();
    me.foodCoin.get("delivered").valueChanges.subscribe((value: number)=>{
      if(!me.foodCoin.get("amount").touched){
        me.foodCoin.get("amount").setValue(me.foodCoin.get("delivered").value);
      }
      me.foodCoin.get("returned").setValue(me.round(me.foodCoin.get("delivered").value - me.foodCoin.get("amount").value));
    });

    me.foodCoin.get("amount").valueChanges.subscribe((value: number)=>{
      me.foodCoin.get("returned").setValue(me.round(me.foodCoin.get("delivered").value - me.foodCoin.get("amount").value));
    });
  }

  round(num){
    return Math.round(num * 100) / 100;
  }

  onCloseSave(){
    let me = this;
    let comment = me.foodCoin.get("comment").value;
    me.dialogRef.close({
      action: 'save',
      data: {
        amount: me.foodCoin.get("amount").value,
        comment: comment ? comment : "" 
      }
    });
  }

  onCloseReintegro(){
    let me = this;
    let comment = me.foodCoin.get("comment").value;
    me.dialogRef.close({
      action: 'save',
      data: {
        amount: -me.foodCoin.get("amount").value,
        comment: comment ? comment : "" 
      }
    });
  }

  onCloseExit(){
    this.dialogRef.close({
      action: 'exit'});
  }

}
