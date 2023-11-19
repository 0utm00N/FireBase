import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  item!: Item | null;

  constructor(private route: ActivatedRoute, private itemsService: ItemsService) {}

  async ngOnInit() {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      this.item = await this.itemsService.getItem(itemId);
    }
  }
}
  


