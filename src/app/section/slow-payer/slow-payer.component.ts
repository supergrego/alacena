import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../../providers/data-sharing.service';
import { MatDialog } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-slow-payer',
  templateUrl: './slow-payer.component.html',
  styleUrls: ['./slow-payer.component.css']
})
export class SlowPayerComponent implements OnInit {

  slowPayers: Array<{name:string, amount:Number, photo?:string}>;
  showComponent: string;
  browser: string;

  constructor(private dShare: DataSharingService, public dialog: MatDialog,
              private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    let me = this;
    me.browser = me.deviceService.browser;
    me.dShare.slowPayer.subscribe(slowPayers => {
      me.slowPayers = slowPayers;
      me.showComponent = slowPayers.length > 0 ? "" : "hidden";
    });
  }
}
