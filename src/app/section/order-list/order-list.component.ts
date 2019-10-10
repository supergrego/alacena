import { LogDialogComponent } from './../../dialog/log-dialog/log-dialog.component';
import { SnackComponent } from './../../dialog/snack/snack.component';
import { OrderGroupedDialogComponent } from './../../dialog/order-grouped-dialog/order-grouped-dialog.component';
import { ShareAccountDialogComponent } from './../../dialog/share-account-dialog/share-account-dialog.component';
import { SplitAccountDialogComponent } from './../../dialog/split-account-dialog/split-account-dialog.component';
import { RolesDialogComponent } from './../../dialog/roles-dialog/roles-dialog.component';
import { MoneyDialogComponent } from './../../dialog/money-dialog/money-dialog.component';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AfService } from './../../providers/af.service';
import { User } from './../../providers/user';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataSharingService } from '../../providers/data-sharing.service';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { CalendarDialogComponent } from '../../dialog/calendar-dialog/calendar-dialog.component';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  loggedUser: User;
  status: number;
  callerMail: string;
  caller;
  currentDay: number;
  loaded: boolean;
  statusDesc: string;
  orderList = [];
  ordersToCall = [];
  userList = [];
  totalPrice = 0.0;
  bankAmount = 0.0;
  debt = 0.0;
  constructor(private db: AngularFirestore, private afService: AfService,
              private dShare: DataSharingService, public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    var me = this;
    me.loaded = false;
    me.afService.user$.subscribe(user =>{
      this.loggedUser = user;
      this.getOrders();
      if(!user){
        me.dShare.broadcastMyBlance(0.0);
        me.dShare.broadcastOrderPrice(0.0);
      }
    });
    me.dShare.status.subscribe(status => {
      me.status = status;
      switch(status){
        case 0:
          me.statusDesc = "Aún no se ha llamado.";
          break;
        case 1:
          me.statusDesc = "Llamando...";
          break;
        case 2:
          me.statusDesc = "Pedido realizado. Si quieres añadir algo más debes llamar tú.";
          break;
      } 
    });
    me.dShare.caller.subscribe(caller => {
      me.callerMail = caller;
      me.caller = me.getUserByEmail(caller);
    });
    me.dShare.dayNumber.subscribe(currentDay => {
      if(me.currentDay != currentDay){
        me.currentDay = currentDay;
        if(me.loaded){
          me.getOrders();
        }
      }
    });
    me.getUsers().then(ok => {
      me.getOrders();
      me.loaded= true;
    });
  }

  onDeleteOrder(order){
    var me = this;

    if(!(me.loggedUser.roles.admin || (order.userl.email==me.loggedUser.email && !order.confirmed))){
      return;
    }

    let dialogRef = this.dialog.open(DeleteDialogComponent, {data: { order }});

    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.action==='confirm'){
        me.doDeleteOrder(order);
      }
    });
  }

  doDeleteOrder(order){
    var me = this;
    
    if(!order.confirmed){
      me.db.doc('orders/'+order.id).ref.delete();
    }else{
      let user = me.getUserByEmail(order.userl.email);
      if(order.paid){
        let payer = user.sharedMail ? user.sharedMail : user.email; 
        let transaction = me.db.firestore.runTransaction(t => {
          return t.get(me.db.doc("users/"+payer).ref)
              .then(doc => {
                me.deleteConfirmedOrder(order, user, doc, t);
              });
        }).then(result => {
          console.log('Transaction success!');
          me.db.doc('orders/'+order.id).ref.delete();
        }).catch(err => {
          console.log('Transaction failure:', err);
        });
      }else{
        me.db.doc('orders/'+order.id).ref.delete();
      }
    }
  }

  private deleteConfirmedOrder(order, orderUser, payer, transaction){
    var me = this;
    var newAmount = Math.round((payer.data().amount + order.price)*100)/100;
    let logId = new Date().toISOString().replace(/[-|:|\.]/g, '') + orderUser.email.split('@', 1);
    let detailConcept = "";
    transaction.update(payer.ref, { amount: newAmount });
    if(orderUser.fellow){
      detailConcept = "(" + orderUser.email + ") ";
      transaction.set(me.db.doc("logs/"+logId+"F").ref, {
        user: orderUser.fellow,
        responsible: me.loggedUser.email,
        resName: me.loggedUser.displayName,
        concept: "Devolución: " + detailConcept + order.dish,
        amount: order.price,
        balance: newAmount,
        timestamp: new Date(),
        type: "cancel-confirmed-order"                
      });
    }
    transaction.set(me.db.doc("logs/"+logId).ref, {
      user: orderUser.email,
      responsible: me.loggedUser.email,
      resName: me.loggedUser.displayName,
      concept: "Devolución: " + order.dish,
      amount: order.price,
      balance: newAmount,
      timestamp: new Date(),
      type: "cancel-confirmed-order"                
    });
  }

  onShareClick(user){
    var me = this;
    if(!(me.loggedUser.roles.admin && !user.shared)){
      return;
    }
    let dialogRef = this.dialog.open(ShareAccountDialogComponent, {data: { user: user, list: me.getUsersExcept(user.email) }});
    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.action==='save'){
        let sharedUser = me.getUserByEmail(result.data);
        user.shared = true;
        user.sharedMail = result.data;
        user.fellow = sharedUser.email;
        sharedUser.shared = true;
        sharedUser.sharedMail = sharedUser.email;
        sharedUser.amount += user.amount;
        sharedUser.fellow = user.email;
        user.amount = 0.0; 
        me.db.doc('users/'+user.email).ref.set(user);
        me.db.doc('users/'+sharedUser.email).ref.set(sharedUser);
      }
    });
  }

  onSplitClick(user){
    var me = this;
    if(!(me.loggedUser.roles.admin && user.shared)){
      return;
    }
    let sharedUser = user.email !== user.sharedMail ? me.getUserByEmail(user.sharedMail) : me.getUserBySharedMail(user.email);
    let dialogRef = this.dialog.open(SplitAccountDialogComponent, {data: { user: user.email !== user.sharedMail ? sharedUser :user }});
    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.action==='save'){
        user.amount = user.sharedMail == user.email ? user.amount : 0.0;
        user.shared = false;
        user.sharedMail = null;
        user.fellow = null;
        sharedUser.amount = sharedUser.sharedMail == sharedUser.email ? sharedUser.amount : 0.0;
        sharedUser.shared = false;
        sharedUser.sharedMail = null;
        sharedUser.fellow = null;
        me.db.doc('users/'+user.email).ref.set(user);
        me.db.doc('users/'+sharedUser.email).ref.set(sharedUser);
      }
    });
  }

  onRolesClick(user){
    var me = this;
    if(!me.loggedUser.roles.admin){
      return;
    }
    let dialogRef = this.dialog.open(RolesDialogComponent,
      { data:
        {
          email: user.email,
          roles:
          {
            admin: user.roles.admin,
            caller: user.roles.caller,
            accountant: user.roles.accountant,
            firstFloor: user.roles.firstFloor ? true : false  
          }
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.action==='save'){
        user.roles = result.roles;
        me.db.doc('users/'+user.email).ref.set(user);
      }
    });
  }

  onCalendarClick(user){
    var me = this;
    if(!me.loggedUser.roles.admin){
      return;
    }
    let dialogRef = this.dialog.open(CalendarDialogComponent,
      { data:
        {
          email: user.email
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.action==='save'){
        if(!result.data.date){
          return;
        }
        me.db.collection("blankdays").add({
          date: result.data.date.toDate(),
          description: result.data.description,
          isHoliday: result.data.isHoliday
        });
      }
    });
  }

  onLogClick(user){
    var me = this;
    if(me.loggedUser.email != user.email && !me.loggedUser.roles.admin){
      return;
    }
    let firstDate = new Date();
    firstDate = me.addDays(firstDate, -365);
    let log = me.afService.getLog(firstDate, null, user.email);
    let dialogRef = this.dialog.open(LogDialogComponent, { data: log });
  }

  private addDays(date, days){
    date.setDate(date.getDate() + days);
    return date;
  }

  onMoneyClick(user){
    var me = this;
    if(!(me.loggedUser.roles.admin || me.loggedUser.roles.accountant)){
      return;
    }
    let dialogRef = this.dialog.open(MoneyDialogComponent, {data: {amount: user.amount, photoUrl: user.photoUrl }});
    let holderUser = (user.shared && user.email !== user.sharedMail) ? me.getUserByEmail(user.sharedMail) : user;

    dialogRef.afterClosed().subscribe(result => {
      if(result != null && result.action==='save'){
        holderUser.amount = Math.round((holderUser.amount + result.data.amount)*100)/100;
        me.db.doc('users/'+holderUser.email).ref.set(holderUser).then(function (){
          let comment : string;
          comment = result.data.comment.length > 0 ? " (" + result.data.comment + ")" : "";
          me.db.collection("logs").add({
            user: holderUser.email,
            responsible: me.loggedUser.email,
            resName: me.loggedUser.displayName,
            concept: (result.data.amount > 0 ? "Ingreso" : "Reintegro") + comment,
            amount: result.data.amount,
            balance: holderUser.amount,
            timestamp: new Date(),
            type: "bank"
          });
          if(holderUser.fellow){
            me.db.collection("logs").add({
              user: holderUser.fellow,
              responsible: me.loggedUser.email,
              resName: me.loggedUser.displayName,
              concept: (result.data.amount > 0 ? "Ingreso" : "Reintegro") + comment,
              amount: result.data.amount,
              balance: holderUser.amount,
              timestamp: new Date(),
              type: "bank"
            });
          }
        });
      }
    });
  }

  onCalledClick(order){
    var me = this;
    if(!(me.loggedUser.roles.admin || me.loggedUser.roles.caller || order.userl.email===me.loggedUser.email) ||
      order.confirmed ||
      (!order.confirmed && me.status === 0)){
      return;
    }
    me.processTranscaction(me.buildStaticOrder(order)).then( ok => {
      me.snackBar.openFromComponent(SnackComponent, {
        duration: 900,
        data: {
          text: "Pedido confirmado",
          icon: "check_circle"
        }
      });
    }).catch(error =>{
      me.snackBar.openFromComponent(SnackComponent, {
        duration: 1500,
        data: {
          text: "Error confirmando. Inténtelo de nuevo.",
          icon: "cancel"
        }
      });
    });
  }

  onCallClick(){
    var me = this;
    if(!(me.loggedUser.roles.admin || me.loggedUser.roles.caller)){
      return;
    }
    me.db.doc("setup/3mLmV0b8lWmU2F7ret6K").update({phoned: 1, caller: me.loggedUser.email}).then(
      ok =>{
        me.fillOrdersToCall();
        let groupedList = me.getGroupedList(me.ordersToCall);
        let dialogRef = this.dialog.open(OrderGroupedDialogComponent, {data: { list: groupedList, total: me.ordersToCall.length}});

        dialogRef.afterClosed().subscribe(result => {
          if(result != null && result.action==='save'){
            if(me.ordersToCall.length>0){
              me.processTranscactions();
            }
          }else{
            me.ordersToCall = [];
            if(me.status < 2){
              me.db.doc("setup/3mLmV0b8lWmU2F7ret6K").update({phoned: 0, caller: ""});
            }
          }
        });
      }
    );
  }

  onSummary(){
    var me = this;
    if(!(me.loggedUser.roles.admin || me.loggedUser.roles.caller)){
      return;
    }
    let groupedList = me.getGroupedList(me.orderList);
    me.dialog.open(OrderGroupedDialogComponent, {
      data: {
        list: groupedList,
        total: me.orderList.length,
        readonly: true
      }
    });
  }

  onFirstFloor(){
    var me = this;
    if(!(me.loggedUser.roles.admin || me.loggedUser.roles.firstFloor)){
      return;
    }
    let groupedList = me.getGroupedList(me.getOrdersFirstFloor());
    me.dialog.open(OrderGroupedDialogComponent, {
      data: {
        list: groupedList,
        total: groupedList.length,
        readonly: true
      }
    });
  }

  private getOrdersFirstFloor(){
    var me = this,
        orders = [];

    me.orderList.forEach(function (order){
      if(order.userl.roles.firstFloor)
      orders.push(me.buildStaticOrder(order));
    });
    return orders;
  }

  private fillOrdersToCall(){
    var me = this;

    me.orderList.forEach(function (order){
      if(!order.confirmed)
      me.ordersToCall.push(me.buildStaticOrder(order));
    });
  }

  private buildStaticOrder(order){
    let me = this;
    let docUserPath = order.user._key.path.segments;
    let mailUser = docUserPath[docUserPath.length-1];
    return {
      id: order.id,
      user: mailUser,
      paid: order.paid,
      dish: this.buildOrderDish(order),
      price: order.price,
      confirmed: order.confirmed
    };
  }

  private buildOrderDish(order){
    if(order.garrison){
      if(order.dish.indexOf("guarnición")>=0){
        return order.dish.replace("guarnición", order.garrison.toLowerCase());
      }else{
        return order.dish + " con " + order.garrison.toLowerCase();
      }
    }else{
      return order.dish;
    }
  }

  private processTranscactions(){
    let me = this;
    let order = me.ordersToCall.shift();

    if(order){
      me.processTranscaction(order);
    }else{
      me.db.doc("setup/3mLmV0b8lWmU2F7ret6K").update({phoned: 2, caller: me.loggedUser.email});
    }
  }

  private processTranscaction(order){
    let me = this,
        user = me.getUserByEmail(order.user);
    let promise = new Promise((resolve, reject) => {
      if(!order.paid){
        let payer = user.sharedMail ? user.sharedMail : user.email; 
        me.db.firestore.runTransaction(t => {
          return t.get(me.db.doc("users/"+payer).ref)
              .then(doc => {
                me.payOrder(order, user, doc, t);
              });
        }).then(result => {
          console.log('Transaction success!');
          me.processTranscactions();
          resolve();
        }).catch(err => {
          console.log('Transaction failure:', err);
          me.ordersToCall.push(order);
          me.processTranscactions();
          reject();
        });
      } else if(!order.confirmed) {
        order.confirmed = true;
        me.db.firestore.runTransaction(t => {
          return t.get(me.db.doc('orders/'+order.id).ref).then(doc => {
            t.update(me.db.doc('orders/'+order.id).ref, {confirmed: true});
          });
        }).then(result => {
          me.processTranscactions();
          console.log('Transaction success!');
          resolve();
        }).catch(err => {
          console.log('Transaction failure:', err);
          me.ordersToCall.push(order);
          me.processTranscactions();
          reject();
        });
      }
    });
    return promise;
  }

  private payOrder(order, orderUser, payer, transaction){
    var me = this;
    var newAmount = Math.round((payer.data().amount - order.price)*100)/100;
    let logId = new Date().toISOString().replace(/[-|:|\.]/g, '') + orderUser.email.split('@', 1);
    let detailConcept = "";
    transaction.update(payer.ref, { amount: newAmount });
    transaction.update(me.db.doc('orders/'+order.id).ref, {paid: true, confirmed: true});
    if(orderUser.fellow){
      detailConcept = "(" + orderUser.email + ") ";
      transaction.set(me.db.doc("logs/"+logId+"F").ref, {
        user: orderUser.fellow,
        responsible: me.loggedUser.email,
        resName: me.loggedUser.displayName,
        concept: "Pago: " + detailConcept + order.dish,
        amount: -order.price,
        balance: newAmount,
        timestamp: new Date(),
        type: "pay"                
      });
    }
    transaction.set(me.db.doc("logs/"+logId).ref, {
      user: orderUser.email,
      responsible: me.loggedUser.email,
      resName: me.loggedUser.displayName,
      concept: "Pago: " + order.dish,
      amount: -order.price,
      balance: newAmount,
      timestamp: new Date(),
      type: "pay"                
    });
  }

  private getGroupedList(orders){
    var me = this;
    let result = [];
    let ordered = orders.sort(function(a, b){
      if(a.dish > b.dish) return 1;
      else if(a.dish < b.dish) return -1;
      else if(a.garrison > b.garrison) return 1;
      else if(a.garrison < b.garrison) return -1;
      else return 0;
    });
    ordered.forEach(function(value){
      if(result.length == 0 || (result.length > 0 && result[result.length-1].description != value.dish + (value.garrison ? " ("+value.garrison +")": ""))){
        result.push({
          description: value.dish + (value.garrison ? " ("+value.garrison +")": ""),
          count: 1
        });
      }else{
        result[result.length-1].count += 1;
      }
    });
    return result;
  }

  private getOrders(){
    var me = this,
        today = new Date(),
        userPrice = 0.0;
    today.setHours(0,0,0),

    me.db.collection("orders").ref.where("date", ">=", today).onSnapshot(function(result){
      me.orderList = [];
      me.totalPrice = 0.0;
      userPrice = 0.0;
      result.forEach(function (doc){
        var orderItem = doc.data();
        let docUserPath = orderItem.user._key.path.segments;
        let mailUser = docUserPath[docUserPath.length-1];
        let user = me.getUserByEmail(mailUser);
        orderItem.id = doc.id;
        orderItem.userl = user;
        me.totalPrice += orderItem.price;
        me.totalPrice = Math.round(me.totalPrice*100)/100;
        me.orderList.push(orderItem);
        if(me.loggedUser !== undefined && me.loggedUser !=null && orderItem.userl.email == me.loggedUser.email){
          userPrice = userPrice + orderItem.price;
          userPrice = Math.round(userPrice*100)/100;
        }
      });
      me.dShare.broadcastOrderPrice(userPrice);
      me.broadcastBalance();
    });
  }

  private broadcastBalance(){
    var me = this;
    if(me.loggedUser){
      me.dShare.broadcastMyBlance(me.getUserByEmail(me.loggedUser.email).amount);
    }
  }

  private getUsers(){
    var me = this,
        today = new Date();
    today.setHours(0,0,0);

    let promise = new Promise((resolve, reject) => {
      me.db.collection("users").ref.onSnapshot(function(user){
        me.userList = [];
        me.bankAmount = 0.0;
        me.debt = 0.0;
        user.forEach(function (doc){
            me.userList.push(doc.data());
            me.bankAmount = me.bankAmount + doc.data().amount;
            me.debt += doc.data().amount < 0 ? doc.data().amount : 0.0;
        });

        me.userList.sort(function(a, b){
          if(a.displayName > b.displayName) return 1;
          else if(a.displayName < b.displayName) return -1;
          else return 0;
        });

        me.updateSharedAmounts();
        me.broadcastBalance();
        me.broadcastSlowPayers();
        me.broadcastUserList();
        if(resolve){
          resolve();
        }
      });
    });
    return promise;
  }

  private broadcastSlowPayers(){
    let me = this;
    let slowPayers = new Array<{name:string, amount:Number, photo?:string}>();
    if(me.userList && me.userList.length > 0){
      let filteredUsers = me.userList.filter(function(user){
        return user.amount < 0;
      });
      if(filteredUsers.length > 0){
        filteredUsers.forEach(function (user) {
          slowPayers.push({
            name: user.displayName,
            amount: user.amount,
            photo: user.photoUrl
          });
        });
      }
      slowPayers = slowPayers.sort(function(a, b){
        if(a.amount > b.amount) return 1;
        else if(a.amount < b.amount) return -1;
        else return 0;
      });
      me.dShare.broadcastSlowPayers(slowPayers);
    }
  }

  private broadcastUserList(){
    let me = this;
    let users = Array<{name:string, email:string, photo?:string}>();
    if(me.userList && me.userList.length > 0){
      me.userList.forEach(function (user) {
        users.push({
          name: user.displayName,
          email: user.email,
          photo: user.photoUrl
        });
      });
      me.dShare.broadcastUserList(users);
    }
  }

  private updateSharedAmounts(){
    var me = this;
    let sharedUsers = me.userList.filter(function (user){return user.shared;});
    sharedUsers.forEach(function (user){
      if(user.email !== user.sharedMail){
        let sharedUser = sharedUsers.find(function (us){ return us.email === user.sharedMail;});
        if(sharedUser){
          user.amount = sharedUser.amount;
        }
      }
    });
    me.caller = me.getUserByEmail(me.callerMail);
  }

  private getUserByEmail(email){
    var me = this;
    return me.userList.find(function (user){
      return user.email === email;
    });
  }

  private getUserBySharedMail(email){
    var me = this;
    return me.userList.find(function (user){
      return user.sharedMail === email && user.email !== email;
    });
  }

  private getUsersExcept(email){
    var me = this;
    return me.userList.filter(function (user){
      return user.email !== email && !user.shared;
    });
  }
}
