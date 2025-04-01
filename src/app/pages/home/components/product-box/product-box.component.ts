import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { IProduct } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  imports: [MatCard, CurrencyPipe, MatIcon, NgClass, NgIf],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss',
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: IProduct | undefined;
  @Output() addToCart = new EventEmitter();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  ngOnInit() {
    console.log(this.product?.image);
  }

  protected readonly print = print;
}
