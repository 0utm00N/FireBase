import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Item } from 'src/app/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  item: Item[] = [];
  originalItems: Item[] = [];
  datos !: FormGroup
  editingItem: Item | null = null;
  categoriaSeleccionada: string | undefined;
  

  constructor(private userService: UserService,
    private router : Router, 
    private itemService: ItemsService,
    private formBuilder: FormBuilder) {

      this.item = [{
        name: 'x',
        descripcion: 'x',
        categoria: 'x',
        precio: 2
      }];
    }

  ngOnInit() {
    this.datos = this.formBuilder.group({
      name: [''],
      descripcion: [''],
      categoria: [''],
      precio: ['']
    })

    this.itemService.getItems().subscribe(items => {
      this.item = items;
      this.originalItems = [...items];
    });

  }

  filtrarPorCategoria() {
    if (this.categoriaSeleccionada) {
      // Filtra los elementos según la categoría seleccionada
      this.item = this.originalItems.filter(item => item.categoria === this.categoriaSeleccionada);
    }
  }

  resetFiltro() {
    this.categoriaSeleccionada = undefined;
    this.itemService.getItems().subscribe(items => {
      this.item = items;
    });
  }

  logOut(){
    this.userService.logout()
    this.router.navigateByUrl('login')
  }

  addItem() {
    if (this.editingItem) {
      const updatedItem: Item = {
        id: this.editingItem.id,
        name: this.datos.value.name,
        descripcion: this.datos.value.descripcion,
        categoria: this.datos.value.categoria,
        precio: this.datos.value.precio,
      };
  
      this.itemService.editItem(updatedItem).then(() => {
        console.log('Elemento actualizado con éxito');
        this.editingItem = null;  
        this.datos.reset();  
      });
    } else {

      this.itemService.addItem(this.datos.value);
      console.log(this.datos.value);
      this.datos.reset();  
    }
  }


  async deleteItem(item: Item){
    const response = await this.itemService.deleteItem(item);
    console.log(response);
  }

  updateItemForm(item: Item) {
    this.editingItem = item;
    this.datos.setValue({
      name: item.name,
      descripcion: item.descripcion,
      categoria: item.categoria,
      precio: item.precio
    });
  }

  verDetalle(itemId: string | undefined) {
    if (itemId) {
      this.router.navigateByUrl(`/elemento/detail/${itemId}`);
    } else {
      console.error('El ID del elemento es undefined');
    }
  }

}
