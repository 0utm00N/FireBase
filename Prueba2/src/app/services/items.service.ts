import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Item } from '../item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private firestore : Firestore) { }

  addItem(item: Item){
    const itemRef = collection(this.firestore, 'items');
    return addDoc(itemRef, item);
  }

}
