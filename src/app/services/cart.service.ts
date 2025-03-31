import { Injectable } from '@angular/core';
import {ICart, ICartItem} from '../models/cart.model';
import {BehaviorSubject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<ICart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: ICartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    }
    else {
      items.push(item);
    }

    this.cart.next({items});
    this._snackBar.open('1 item added to cart', 'Ok', {duration: 3000});
  }

  getTotal(items: ICartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, curr) => prev + curr, 0);
  }

  clearCart(): void {
    this.cart.next({items: []});
    this._snackBar.open('Cart is cleared', 'Ok', {duration: 3000});
  }

  removeFromCart(item: ICartItem, update = true): ICartItem[] {
    const filterItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id);
    if (update) {
      this.cart.next({items: filterItems});
      this._snackBar.open('Item removed from cart', 'Ok', {duration: 3000});
    }

    return filterItems;
  }

  removeQuantity(item: ICartItem) {
    let itemForRemove: ICartItem | undefined;
    let filterItems = this.cart.value.items.map((_item) => {
      if(_item.id === item.id) {
        _item.quantity -= 1;
        if(_item.quantity === 0) {
          itemForRemove = _item;
        }
      }
      return _item;
    });
    if(itemForRemove) {
      filterItems = this.removeFromCart(itemForRemove, false);
    }
    this.cart.next({items: filterItems});
    this._snackBar.open('Item removed from cart', 'Ok', {duration: 3000});
  }
}
