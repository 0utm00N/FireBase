import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword,  signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, DocumentData, DocumentReference, getDoc, collectionData, updateDoc } from '@angular/fire/firestore';
import { User } from '../user';
import { Observable } from 'rxjs';
import { query, where, CollectionReference, Query } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private auth: Auth, private firestore: Firestore) {
  }

  getUser(email: string): Observable<User[]> {
    const q: Query<User> = query(collection(this.firestore, 'usuarios') as CollectionReference<User>, where('email', '==', email));
    return collectionData(q, { idField: 'id' }) as Observable<User[]>;
  }

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


  async login({ email, password }: any) {
    try {
      console.log("Intentando iniciar sesión", email);
  
      if (email === 'admin@admin.admin' && password === 'admin') {
        const adminUser = await signInWithEmailAndPassword(this.auth, email, password);
        return adminUser;
      } else {
        const user = await signInWithEmailAndPassword(this.auth, email, password);
        return user;
      }
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

  editUser(user: User) {
    const userDocRef = doc(this.firestore, `usuarios/${user.email}`);

    const updatedData = {
      name: user.name,
      telefono: user.telefono,
      edad: user.edad
    };
    return updateDoc(userDocRef, updatedData);
  } 



}


