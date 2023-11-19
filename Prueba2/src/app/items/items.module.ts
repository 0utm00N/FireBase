import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemsPageRoutingModule } from './items-routing.module';

import { ItemsPage } from './items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ItemsPageRoutingModule
  ],
  declarations: [ItemsPage]
})
export class ItemsPageModule {}
