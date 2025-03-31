import {Component, Input} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatBadge } from '@angular/material/badge';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {ICart, ICartItem} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatIcon,
    RouterLink,
    MatBadge,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    CurrencyPipe,
    NgIf,
    NgForOf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private _cart: ICart = {items: []};
  itemsQuantity: number = 0;

  @Input()
  get cart(): ICart {
    return this._cart;
  }

  set cart(cart: ICart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, cur) => prev + cur, 0);
  }

  constructor(private cartService: CartService) {
  }

  getTotal(items: ICartItem[]): number {
    return this.cartService.getTotal(items)
  }

  onClearCart() {
    this.cartService.clearCart()
  }
}
