import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth : Auth, private firestore : Firestore) { }

  async register ({email,password}:any) {
    try {
      console.log("Intentando crear usuario",email);
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async login ({email,password}:any) {
    try {
      console.log("Intentando crear usuario",email);
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  logout () {
    return signOut(this.auth);
  }

  addUser(user: User){
    const userRef = collection(this.firestore, 'usuarios');
    return addDoc(userRef, user);
  }



}
