import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../../../models/cart.model';
import {RouterLink} from '@angular/router';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {NgIf, CommonModule} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';

@Component({
  selector: 'app-cart',
  imports: [
    MatButton,
    RouterLink,
    MatCard,
    NgIf,
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatFooterRow,
    MatRowDef,
    MatFooterRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatFooterCell,
    MatHeaderCellDef,
    MatFooterCellDef,
    CommonModule,
    MatMiniFabButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart: Cart = {items: [{
      product: 'https://i.postimg.cc/Vrc26069/dress.jpg',
      name: 'dress',
      price: 150,
      quantity: 1,
      id: 1
    },
      {
        product: 'https://i.postimg.cc/Vrc26069/dress.jpg',
        name: 'dress',
        price: 150,
        quantity: 1,
        id: 1
      }],
  }

  dataSource: CartItem[] = []
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  ngOnInit() {
    this.dataSource = this.cart.items;
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
