import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { DeviceDetectorModule } from 'ngx-device-detector';

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { DayInfoComponent } from './section/day-info/day-info.component';
import { AfService } from './providers/af.service';
import { DataSharingService } from './providers/data-sharing.service';
import { LogDialogComponent } from './dialog/log-dialog/log-dialog.component';
import { LoginPageComponent } from './section/login-page/login-page.component';
import { SlowPayerComponent } from './section/slow-payer/slow-payer.component';
import { OrderListComponent } from './section/order-list/order-list.component';
import { CallDialogComponent } from './dialog/call-dialog/call-dialog.component';
import { OrderGroupedDialogComponent } from './dialog/order-grouped-dialog/order-grouped-dialog.component';
import { ShareAccountDialogComponent } from './dialog/share-account-dialog/share-account-dialog.component';
import { SplitAccountDialogComponent } from './dialog/split-account-dialog/split-account-dialog.component';
import { RolesDialogComponent } from './dialog/roles-dialog/roles-dialog.component';
import { MoneyDialogComponent } from './dialog/money-dialog/money-dialog.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { CalendarDialogComponent } from './dialog/calendar-dialog/calendar-dialog.component';
import { CalendarComponent } from './section/calendar/calendar.component';
import { SnackComponent } from './dialog/snack/snack.component';

@NgModule({
  declarations: [
    AppComponent,
    DayInfoComponent,
    LogDialogComponent,
    LoginPageComponent,
    SlowPayerComponent,
    OrderListComponent,
    CallDialogComponent,
    OrderGroupedDialogComponent,
    ShareAccountDialogComponent,
    SplitAccountDialogComponent,
    RolesDialogComponent,
    MoneyDialogComponent,
    DeleteDialogComponent,
    CalendarDialogComponent,
    CalendarComponent,
    SnackComponent
  ],
  entryComponents: [LogDialogComponent ,CallDialogComponent, OrderGroupedDialogComponent, ShareAccountDialogComponent,
                    SplitAccountDialogComponent, RolesDialogComponent, MoneyDialogComponent, DeleteDialogComponent,
                    CalendarDialogComponent, SnackComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [AfService, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
