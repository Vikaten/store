import { Component, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Product } from '../../../../models/product.model';

@Component({
  selector: 'app-product-box',
  imports: [MatCard, CurrencyPipe, MatIcon, NgClass, NgIf],
  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: 'Snikers',
    price: 150,
    category:'shoes',
    description: 'fdmkfmckmskmcsd',
    imageUrl: 'https://i.postimg.cc/Vrc26069/dress.jpg'
  };

  onAddToCart() {

  }
}
