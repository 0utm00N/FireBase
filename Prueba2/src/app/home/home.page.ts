import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private userService: UserService, 
    private router : Router, 
    private itemService: ItemsService,
    private formBuilder: FormBuilder) {}

  datos !: FormGroup

  ngOnInit() {
    this.datos = this.formBuilder.group({
      name: [''],
      descripcion: [''],
      precio: ['']
    })
  }

  logOut(){
    this.userService.logout()
    this.router.navigateByUrl('login')
  }

  addItem(){
    this.itemService.addItem(this.datos.value)
    console.log(this.datos.value)
  }

}
