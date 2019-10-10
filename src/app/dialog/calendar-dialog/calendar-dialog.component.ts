import { Component, OnInit, Injectable, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class CalendarDialogComponent implements OnInit {
  valDesc: FormControl;
  dateForm: FormGroup;
  datePicked: Date;
  description: string;
  isHoliday: boolean;
  constructor(public dialogRef: MatDialogRef<CalendarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              fb: FormBuilder) { 
    this.dateForm = fb.group({
      datePicked: 0,
      description: ""
    });
  }

  getErrorMessage() {
    return this.valDesc.hasError('required') ? 'El campo no puede estar vacío' : '';
  }

  getErrorDate() {
    return this.valDesc.hasError('required') ? 'El campo debe contener una fecha' : '';
  }

  ngOnInit() {
    let me = this;
    me.valDesc = new FormControl("", [Validators.required]);
    me.isHoliday = true;
  }

  changeHoliday(){
    let me = this;
    me.isHoliday = !me.isHoliday;
  }

  onCloseSave(){
    var me = this;
    if(me.dateForm.valid){
      this.dialogRef.close({
        action: 'save',
        data: {
          date: me.dateForm.get("datePicked").value,
          description: me.dateForm.get("description").value,
          isHoliday: me.isHoliday
        }
      })
    };
  }

  onCloseExit(){
    this.dialogRef.close({
      action: 'exit'});
  }

}
