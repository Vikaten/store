import { Component, OnInit } from '@angular/core';
import { ICart, ICartItem } from '../../../../models/cart.model';
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
import {CartService} from '../../../../services/cart.service';

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
  cart: ICart = {items: [{
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

  dataSource: ICartItem[] = []
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: ICart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
  }

  getTotal(items: ICartItem[]): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart()
  }

  onRemoveFromCart(item: ICartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: ICartItem) {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: ICartItem) {
    this.cartService.removeQuantity(item);
  }
}
