import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../../providers/user';
import { AfService } from './../../providers/af.service';
import { StaticDataService } from './../../providers/static-data.service';
import { DataSharingService } from '../../providers/data-sharing.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LogDialogComponent } from './../../dialog/log-dialog/log-dialog.component';
import { CallDialogComponent } from './../../dialog/call-dialog/call-dialog.component'
import { SnackComponent } from './../../dialog/snack/snack.component';

@Component({
  selector: 'day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.css']
})

export class DayInfoComponent implements OnInit {
  private sdb: StaticDataService;
  user: User;
  message: string;
  setup = {
    alert: "",
    day: 0,
    date: null,
    spanishDate: "",
    phoned: 0
  };
  private blankDays = new Array<{id:string, date: Date,description: string,isHoliday:boolean}>();
  setupRef;
  enableOrder = false;
  dailyDishes = [];
  dailyDishesCombo = [];
  garrisonList = [];
  plateList = [];
  sandwichList = [];
  dessertList = [];
  garrison = false;
  selDish;
  selPlate;
  selTab = 0;
  selGarrison;
  selSanwich;
  selDessert;
  plateType = "1";
  singlePrice = 3.6;
  orderPrice = 0;
  myBalance = 0;
  myBalanceCls = "price-box pedido nomoroso";
  onBehalfOfUser: string;
  userList: Array<{name:string, email:string, photo?:string}>;

  constructor(private db: AngularFirestore, private afService: AfService,
              private dShare: DataSharingService, public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    var me = this;
    me.sdb = new StaticDataService();
    me.plateList = me.sdb.getPlates(me.plateType);
    me.sandwichList = me.sdb.sandwiches.slice();
    me.dessertList = me.sdb.desserts;
    me.afService.user$.subscribe(user =>{
      this.user = user
      this.onBehalfOfUser = "";
    });
    me.dShare.orderPrice.subscribe(price =>{
      me.orderPrice = price;
      me.setBalanceCls();
    });
    me.dShare.myBalance.subscribe(balance =>{
      me.myBalance = balance;
      me.setBalanceCls();
    });
    me.dShare.userList.subscribe(users =>{
      me.userList = users;
    });
    me.setupRef = this.db.doc("setup/3mLmV0b8lWmU2F7ret6K").ref;
    me.setupRef.onSnapshot(function (doc){
      me.setup = doc.data();
      me.setup.date = me.setup.date.toDate(); 
      me.dShare.broadcastCaller(doc.data().caller);
      me.dShare.broadcastStatus(doc.data().phoned);
      me.dShare.broadcastDayNumber(doc.data().day);
      me.updateSetupIfRequired();
      me.getDailyDishes();
      me.setup.spanishDate = me.getSpanishDate(me.setup.date);
    });
  }

  private setBalanceCls(){
    var me = this;
    if(me.myBalance < 0){
      me.myBalanceCls = "price-box pedido moroso";
    }else if((me.myBalance - me.orderPrice) < 0 && me.setup.phoned == 0){
      me.myBalanceCls = "price-box pedido almostmoroso";
    }else{
      me.myBalanceCls = "price-box pedido nomoroso";
    }
  }

  onTabClick(event){
    var me = this;
    me.selTab = event.index;
    me.selDish = undefined;
    me.selPlate = undefined;
    me.selGarrison = undefined;
    me.selSanwich = undefined;
    me.selDessert = undefined;
    me.garrison = false;
    if(me.selTab === 0){
      me.singlePrice = 3.6;
    }else{
      me.singlePrice = undefined;
    }
    me.enableOrder = false;
  }

  dishSelected(event){
    var me = this,
        selectedDish = this.dailyDishesCombo.find(function(dish){
          return dish.id == event.value;
        });
    me.garrison = selectedDish.garrison_type > 0;
    if(me.garrison){
      me.getGarrison(selectedDish.garrison_type);
    }else{
      me.selGarrison = undefined;
    }
    me.enableOrder = !me.garrison || me.selGarrison != undefined;
  }

  plateSelected(event){
    var me = this,
        selectedPlate = me.plateList.find(function(plate){
          return plate.id == event.value;
        });
    me.garrison = selectedPlate.garrison_type > 0 && me.plateType === "1";

    if(me.garrison){
      me.getGarrison(selectedPlate.garrison_type);
    }

    me.enableOrder = !me.garrison || me.selGarrison != undefined;

    me.singlePrice = me.getPrice(selectedPlate);
  }

  private getPrice(plate){
    var me = this,
        price;
    if(!plate) return price;
    switch(me.plateType){
      case "1":
        price = 3.6;
        break;
      case "2":
        price = plate.half;
        break;
      case "3":
        price = plate.entire;
        break;
    }
    return price;
  }

  plateTypeChanged(event){
    var me = this;
    me.plateType = event.value;
    me.garrison = me.plateType === "1";
    me.plateList = me.sdb.getPlates(me.plateType);
    var selectedPlate = me.plateList.find(function(plate){
      return plate.id == me.selPlate;
    });
    if(!me.garrison){
      me.selGarrison = undefined;
    } 
    me.singlePrice = me.getPrice(selectedPlate);
    me.enableOrder = (!me.garrison && me.selPlate!=null && me.singlePrice != null) || me.selGarrison;
  }

  sandwichSelected(event){
    var me = this;
    var selectedSandwich = me.sandwichList.find(function(sandwich){
      return sandwich.id == event.value;
    });

    me.singlePrice = selectedSandwich.price;
    me.enableOrder = true;
  }

  dessertSelected(event){
    var me = this;
    var selectedDessert = me.dessertList.find(function(dessert){
      return dessert.id == event.value;
    });

    me.singlePrice = selectedDessert.price;
    me.enableOrder = true;
  }

  garrisonSelected(event){
    var me = this;
    me.enableOrder = true;
  }

  addOrder(){
    var me = this;

    if(me.setup.phoned>0){
      me.openCalledDialog();
      return;
    }
    me.createOrder();
  }

  createOrder(){
    let me = this;
    let orderUser = !me.onBehalfOfUser ? me.user.email : me.onBehalfOfUser;
    me.db.doc("setup/3mLmV0b8lWmU2F7ret6K").ref.get().then(doc => {
      if(me.getSpanishDate(new Date())===me.getSpanishDate(doc.data().date.toDate())){
        me.db.collection("orders").add({
          date: doc.data().date,
          user: me.db.doc("users/"+orderUser).ref,
          dish: me.getFood(),
          garrison: me.selGarrison ? me.selGarrison : null,
          price: me.singlePrice,
          paid: false,
          confirmed: false
        }).then(ok=>{me.openSnackBar();});
      }else{
        this.snackBar.openFromComponent(SnackComponent, {
          duration: 9000,
          data: {
            text: "Error al crear el pedido. Fecha errónea. Recarge la página o compruebe la fecha del sistema.",
            icon: "cancel"
          }
        });
      }
    });
  }

  openCalledDialog(){
    let me = this,
      text = "Ya hemos llamado. Para confirmar tu pedido llama por teléfono al 958 81 28 35. " +
             "Confirma que has llamado pulsando sobre tu línea de pedido en el botón: ";
    me.dialog.open(CallDialogComponent,
      {
        data: {
          title: "REALIZAR PEDIDO",
          text: text,
          icon: "perm_phone_msg"
        }
      }).afterClosed().subscribe(result => {
        if(result.action==='save'){
          me.createOrder();
        }
      });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackComponent, {
      duration: 900,
      data: {
        text: "Pedido añadido",
        icon: "check_circle"
      }
    });
  }

  private getFood(){
    var me = this,
        obj,
        food;
    switch (me.selTab){
      case 0:
        obj = me.dailyDishesCombo.find(function(dish){
          return dish.id == me.selDish;
        });
        food = obj.dish;
        break;
      case 1:
        obj = me.plateList.find(function(plate){
          return plate.id == me.selPlate;
        });
        food = obj.plate + me.getPlateTypeDescription(obj);
        break;
      case 2:
        obj = me.sandwichList.find(function(sandwich){
          return sandwich.id == me.selSanwich;
        });
        food = "Bocadillo: " + obj.sandwich;
        break;
      case 3:
        obj = me.dessertList.find(function(dessert){
          return dessert.id == me.selDessert;
        });
        food = obj.dessert;
        break;
    }
    return food;
  }

  private getPlateTypeDescription(plate){
    var me = this,
        description;
    switch(me.plateType){
      case "1":
        description = "";
        break;
      case "2":
        description = " (media)";
        break;
      case "3":
        description = " (entera)";
        break;
    }
    return description;
  }

  private getDailyDishes(){
    var me = this;
    me.dailyDishes = me.sdb.dishes.filter(function(dish){
      return dish.day === me.setup.day;
    });
    me.dailyDishesCombo = me.dailyDishes.slice();
    me.includeVersionedDish();
  }

  private includeVersionedDish(){
    var me = this,
        versioned = [],
        i=0,
        pos = -1,
        dish;

    me.sandwichList = me.sdb.sandwiches.slice();
    for(i=0;i<me.dailyDishesCombo.length;i++){
      dish = me.dailyDishesCombo[i];
      switch(dish.id){
        case 8:
        case 44:
          me.sandwichList.push({
            id: 844,
            sandwich: "Carne empanada",
            price: 2.75
          });
          break;
        case 11:
        case 71:
          versioned.push({
            id: dish.id + 100, day: dish.day,
            dish: "Quiche espinacas con guarnición",
            garrison_type: 1, with_fish: false, as_garrison: false
          });
          versioned.push({
            id: dish.id + 101, day: dish.day,
            dish: "Quiche pollo con guarnición",
            garrison_type: 1, with_fish: false, as_garrison: false
          });
          versioned.push({
            id: dish.id + 102, day: dish.day,
            dish: "Quiche york queso con guarnición",
            garrison_type: 1, with_fish: false, as_garrison: false
          });
          pos = i;
          break;
        case 19:
        case 56:
            versioned.push({
              id: dish.id + 100, day: dish.day,
              dish: "Croquetas de pollo con guarnición",
              garrison_type: 1, with_fish: false, as_garrison: false
            });
            versioned.push({
              id: dish.id + 101, day: dish.day,
              dish: "Croquetas de espinacas con guarnición",
              garrison_type: 1, with_fish: false, as_garrison: false
            });
            pos = i;
            break;
        case 46:
          versioned.push({
            id: dish.id + 100, day: dish.day,
            dish: "Lasaña de carne",
            garrison_type: 0, with_fish: false, as_garrison: false
          });
          versioned.push({
            id: dish.id + 101, day: dish.day,
            dish: "Lasaña de verduras",
            garrison_type: 0, with_fish: false, as_garrison: false
          });
          versioned.push({
            id: dish.id + 102, day: dish.day,
            dish: "Lasaña mixta",
            garrison_type: 0, with_fish: false, as_garrison: false
          });
          pos = i;
          break;
      }
    }
    if(pos!=-1){
      me.dailyDishesCombo.splice(pos, 1)[0];
      me.dailyDishesCombo = me.dailyDishesCombo.concat(versioned);
    }
  }

  private getGarrison(type){
    var me = this,
        extraGarrison = me.dailyDishesCombo.filter(me.extraGarrisonFilter);
    me.garrisonList = me.sdb.getGarrison(type);
      extraGarrison.forEach(function(garrison){
        me.garrisonList.push({
          combo: false,
          entire: null,
          garrison_type: 1,
          half: 1,
          plate: garrison.dish,
          withFish:false
        });
      });
      me.garrisonList.sort(me.sortGarrison)
  }

  private extraGarrisonFilter(dish){
    return dish.as_garrison == true;
  }

  private sortGarrison(a, b){
    return a.plate < b.plate ? -1 : (a.plate > b.plate ? 1 : 0);
  }

  private updateSetup(newDay){
    let me = this;
    var today = new Date();
    newDay = newDay == 0 ? 1 : newDay;
    this.setup.day = newDay;
    this.setup.date = today;
    this.setupRef.update({day: newDay, date: today, phoned: 0, caller: null});
    this.dShare.broadcastCurrentDay(newDay);
    me.garrison = false;
  }

  private printDate(date: Date){
    var day = date.getDate();
    var monthIndex = date.getMonth()+1;
    var year = date.getFullYear();

    return day + "/" + monthIndex + "/" + year;
  }

  private mustUpdateSetup(){
    let me = this,
        dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
    let today = new Date();
    let isHoliday = false;

    let anyBlank = me.blankDays.filter(function (blankDay) {
      return me.printDate(today) === me.printDate(blankDay.date);
    });

    let isWorkingDay = today.getDay()>0 && today.getDay()<6;
    let setupDate = ""+me.setup.date.getFullYear()+this.setup.date.getMonth()+this.setup.date.getDate();
    let todayDate = ""+today.getFullYear()+today.getMonth()+today.getDate();

    if(!isWorkingDay){
      me.message = "Hoy es " + dias[today.getDay()] + " y no se realizan pedidos";
    }

    if(anyBlank.length > 0){
      let message = "Hoy no se realiza pedido. Razón: ";
      anyBlank.forEach(blankDay =>{
        message = message + blankDay.description;
        isHoliday = isHoliday || blankDay.isHoliday;
      });
      me.message = message;
    }

    return !isHoliday && isWorkingDay && setupDate < todayDate;
  }

  private getSpanishDate(f){
    var meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"),
        dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado");
        f = f ? f : new Date();
    return dias[f.getDay()] + ", " + f.getDate() + " de "  + meses[f.getMonth()] + " de " + f.getFullYear();
  }

  onLogClick(){
    let me = this;
    if(!me.user){
      return;
    }
    let firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 365);
    let log = me.afService.getLog(firstDate, null, me.user.email);
    this.dialog.open(LogDialogComponent, { data: log });
  }

  getBlankDays(){
    let me = this;
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    me.db.collection("blankdays").ref.where("date", ">=", yesterday).onSnapshot(function(result){
      me.blankDays = [];
      result.forEach(function (doc){
        me.blankDays.push({
          id: doc.id,
          date: doc.data().date.toDate(),
          description: doc.data().description,
          isHoliday: doc.data().isHoliday
        });
      });
      me.dShare.broadcastBlankDays(me.blankDays);
      if(me.mustUpdateSetup()){
        me.updateSetup((me.setup.day + 1)%22);
      }else if(me.getSpanishDate(new Date())!==me.getSpanishDate(me.setup.date)){
        me.updateSetup(me.setup.day);
      }
    });
  }

  updateSetupIfRequired(){
    let me = this;
    me.getBlankDays();
  }

  clearOnBehalfOf(){
    let me = this;
    me.onBehalfOfUser = "";
  }
}
