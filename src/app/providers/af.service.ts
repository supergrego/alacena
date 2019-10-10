import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AfService {

  user$: Observable<User>;

  constructor(public afAuth: AngularFireAuth, public afs:AngularFirestore) {
    this.user$ = afAuth.authState.pipe(switchMap(user => {
      if(user){
        return this.afs.doc<User>(`users/${user.email}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  loginWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then((credentials) => {
      this.updateUser(credentials.user);
    });
  }

  updateUser(user){
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.email}`);
    userRef.ref.get().then(function(doc){
      let savedUser = doc.data();
      let data: User = {
        amount:  savedUser != null && savedUser.amount != undefined ? savedUser.amount : 0.0,
        email: user.email,
        uid: user.uid,
        displayName: savedUser != null ? savedUser.displayName : user.displayName,
        photoUrl: savedUser != null ? savedUser.photoUrl : user.photoURL,
        roles: savedUser != null ? savedUser.roles : {
          admin: false,
          accountant: false,
          caller: false
        }
      };
      userRef.set(data, {merge: true});
    });
  }

  getLog(firstDate, lastDate, user){
    var me = this;
    let list = new Array();
    firstDate.setHours(0,0,0);

    me.afs.collection("logs").ref.where("timestamp", ">=", firstDate).where("user", "==", user).get().then(function(result){
      result.forEach(function (doc){
        list.push({
          concept: doc.data().concept,
          timestamp: doc.data().timestamp.toDate(),
          dateString: me.getLogDate(doc.data().timestamp.toDate()),
          type: doc.data().type,
          resName:  doc.data().resName,
          responsible: doc.data().responsible,
          amount: doc.data().amount,
          balance: doc.data().balance,
        });
      });
      list.sort(function(a, b){
        return a.timestamp.getTime() > b.timestamp.getTime() ? -1 : (a.timestamp.getTime() < b.timestamp.getTime() ? 1 : 0);
      });
    });
    return list;
  }

  loginWithEmail(){
    const provider = new firebase.auth.EmailAuthProvider();
    this.afAuth.auth.signInWithPopup(provider);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  private getLogDate(date){
    let me = this;
    let fecha = "[" + me.getDay(date) + "/" + me.getMonth(date) + "/" + me.getYear(date) + " - ";
    let hora = me.getHour(date) + ":" + me.getMin(date) + ":" + me.getSec(date) + "]";
    return fecha + hora;
  }

  private getDay(date){
    return (date.getDate() < 10 ? "0" : "") + date.getDate();
  }

  private getMonth(date){
    return (parseInt(date.getMonth())+1 < 10 ? "0" : "") + (parseInt(date.getMonth())+1);
  }

  private getYear(date){
    return (date.getFullYear() < 10 ? "0" : "") + date.getFullYear();
  }

  private getHour(date){
    return (date.getHours() < 10 ? "0" : "") + date.getHours();
  }

  private getMin(date){
    return (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  }

  private getSec(date){
    return (date.getSeconds() < 10 ? "0" : "") + date.getSeconds();
  }

}
