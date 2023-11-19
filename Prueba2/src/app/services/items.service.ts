import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Item } from '../item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  item: Item[] = [];

  constructor(private firestore : Firestore) { }


  addItem(item: Item){
    const itemRef = collection(this.firestore, 'items');
    return addDoc(itemRef, item);
  }

  getItems(): Observable<Item[]> {
    const itemRef = collection(this.firestore, 'items');
    return collectionData(itemRef, { idField: 'id' }) as Observable<Item[]>;
  }

  async getItem(itemId: string): Promise<Item | null> {
    const itemDocRef = doc(this.firestore, 'items', itemId);
    const docSnapshot = await getDoc(itemDocRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as Item;
    } else {
      return null;
    }
  }

  deleteItem(item: Item) {
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    return deleteDoc(itemDocRef);
  }

  editItem(item: Item) {
    const itemDocRef = doc(this.firestore, `items/${item.id}`);

    const updatedData = {
      name: item.name,
      descripcion: item.descripcion,
      categoria: item.categoria,
      precio: item.precio

    };
    return updateDoc(itemDocRef, updatedData);
  }  
  

}
