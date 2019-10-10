import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-snack',
  templateUrl: './snack.component.html',
  styleUrls: ['./snack.component.css']
})
export class SnackComponent implements OnInit {
  text: string;
  icon: string;
  status: string;
  classIcon: string;
  classText: string;

  constructor(public dialogRef: MatSnackBarRef<SnackComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.text = this.data.text;
    this.icon = this.data.icon;
    this.status = this.icon == "cancel" ? "err" : "ok";
    this.classIcon = "material-icons " + this.status;
    this.classText = "text " + this.status;
  }

}
