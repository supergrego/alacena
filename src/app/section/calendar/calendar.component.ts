import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AfService } from '../../providers/af.service';
import { DataSharingService } from '../../providers/data-sharing.service';
import { MatDialog } from '@angular/material';
import { StaticDataService } from '../../providers/static-data.service';
import { User } from 'src/app/providers/user';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  private sdb: StaticDataService;
  user: User;
  arrayDishes = [];
  calendar = [];
  dayNumber;
  blankDays: Array<{id:string, date: Date,description: string,isHoliday:boolean}>;
  constructor(private db: AngularFirestore, private afService: AfService, private dShare: DataSharingService, public dialog: MatDialog) { }

  ngOnInit() {
    var me = this;
    me.afService.user$.subscribe(user =>{
      this.user = user;
    });
    me.dShare.dayNumber.subscribe(dayNumber => {
      if(me.dayNumber != dayNumber){
        me.dayNumber = dayNumber;
      }
      me.getBlankDays();
    });
    me.dShare.blankDays.subscribe(blankDays => {
      me.blankDays = blankDays;
      me.getBlankDays();
    });
  }

  fillArrayDishes(){
    var me = this;
    me.sdb = new StaticDataService();
    me.sdb.dishes.forEach(d => {
      if(!me.arrayDishes[d.day]){
        me.arrayDishes[d.day] = {
          day: d.day,
          dishes: []
        }
      }
      me.arrayDishes[d.day].dishes.push(d.dish);
    });
  }

  fillCalendar(blankDays: Array<{id:string, date: Date,description: string,isHoliday:boolean}>){
    var me = this,
        date = new Date();

    if(me.arrayDishes.length==0){
      me.fillArrayDishes();
    }

    me.calendar = [];

    for(let i = me.dayNumber;i<me.dayNumber+31;i++){
      var pos = i%21+1;
      date.setDate(date.getDate()+1);
      let anyBlank = blankDays.filter(function (blankDay) {
        return me.printDate(date) === me.printDate(blankDay.date);
      });
      if(anyBlank.length>0){
        me.calendar.push({
          day: "",
          date: me.printDate(anyBlank[0].date),
          blankDay: anyBlank[0].description,
          id: anyBlank[0].id
        });
        i--;
      }else if(date.getDay()==0 || date.getDay()==6){
        me.calendar.push({
          day: "",
          date: me.printDate(date),
          dish1: " ",
          dish2: " ",
          dish3: " ",
          dish4: " "
        });
        i--;
      }else{
        me.calendar.push({
          day: pos,
          date: me.printDate(date),
          dish1: me.arrayDishes[pos].dishes[0],
          dish2: me.arrayDishes[pos].dishes[1],
          dish3: me.arrayDishes[pos].dishes[2],
          dish4: me.arrayDishes[pos].dishes[3]
        });
      }
    }
  }

  printDate(date: Date){
    var day = date.getDate();
    var monthIndex = date.getMonth()+1;
    var year = date.getFullYear();

    return day + "/" + monthIndex + "/" + year;
  }

  deleteBlankDay(id){
    let me = this;
    me.db.doc('blankdays/'+id).ref.delete();
  }

  getBlankDays(){
    let me = this;
    if(me.blankDays && me.dayNumber){
      me.fillCalendar(me.blankDays);
    }
  }

}
