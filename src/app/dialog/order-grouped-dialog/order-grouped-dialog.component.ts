import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-order-grouped-dialog',
  templateUrl: './order-grouped-dialog.component.html',
  styleUrls: ['./order-grouped-dialog.component.css']
})
export class OrderGroupedDialogComponent implements OnInit {
  groupedOrders = [];
  readonly: boolean;
  title: string;
  isDesktop: boolean;
  constructor(public dialogRef: MatDialogRef<OrderGroupedDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private deviceService: DeviceDetectorService) { }

  ngOnInit() {
    let me = this;
    me.isDesktop = me.deviceService.isDesktop();
    me.readonly = me.data.readonly;
    me.title = me.readonly ? "RESUMEN" : "PEDIDO";
  }

  onCloseSave(){
    var me = this;
    me.dialogRef.close({
      action: 'save'});
    }

  onCloseExit(){
    this.dialogRef.close({
      action: 'exit'});
  }

  copyClipboard(){
    let me = this;
    let negritaWhatsapp = me.isDesktop ? "" : "*";
    let text = negritaWhatsapp + "PEDIDO UNIT 4" + negritaWhatsapp + "\r\n\r\n";
    me.data.list.forEach(element => {
      text = text + negritaWhatsapp + element.count + negritaWhatsapp + " " + element.description + "\r\n";
    });
    text = text + "(" + me.data.total + " cosas)";
    var aux = document.createElement("textarea");
    aux.value = text;
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

}
