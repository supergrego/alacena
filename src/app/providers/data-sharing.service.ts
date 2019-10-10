import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataSharingService {
  private orderPriceSource = new BehaviorSubject<number>(0.0);
  private myBalanceSource = new BehaviorSubject<number>(0.0);
  private statusSource = new BehaviorSubject<number>(0);
  private callerSource = new BehaviorSubject<string>("");
  private currentDaySource = new BehaviorSubject<number>(0);
  private dayNumberSource = new BehaviorSubject<number>(0);
  private slowPayerSource = new BehaviorSubject<Array<{name:string, amount:Number, photo?:string}>>(new Array());
  private blankDaysSource = new BehaviorSubject<Array<{id:string, date: Date,description: string,isHoliday:boolean}>>(new Array());
  private userListSource = new BehaviorSubject<Array<{name:string, email:string, photo?:string}>>(new Array());
  orderPrice = this.orderPriceSource.asObservable();
  status = this.statusSource.asObservable();
  caller = this.callerSource.asObservable();
  currentDay = this.currentDaySource.asObservable();
  dayNumber = this.dayNumberSource.asObservable();
  myBalance = this.myBalanceSource.asObservable();
  slowPayer = this.slowPayerSource.asObservable();
  blankDays = this.blankDaysSource.asObservable();
  userList = this.userListSource.asObservable();
  
  constructor() { }

  broadcastOrderPrice(price: number){
    this.orderPriceSource.next(price);
  }

  broadcastMyBlance(price: number){
    this.myBalanceSource.next(price);
  }

  broadcastStatus(status: number){
    this.statusSource.next(status);
  }

  broadcastCaller(caller: string){
    this.callerSource.next(caller);
  }

  broadcastCurrentDay(currentDay: number){
    this.currentDaySource.next(currentDay);
  }

  broadcastDayNumber(dayNumber: number){
    this.dayNumberSource.next(dayNumber);
  }

  broadcastSlowPayers(slowPayers: Array<{name:string, amount:Number, photo?:string}>){
    this.slowPayerSource.next(slowPayers);
  }

  broadcastBlankDays(blankDays: Array<{id:string, date: Date, description: string,isHoliday:boolean}>){
    this.blankDaysSource.next(blankDays);
  }

  broadcastUserList(userList: Array<{name:string, email:string, photo?:string}>){
    this.userListSource.next(userList);
  }
}
