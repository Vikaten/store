import { Component } from '@angular/core';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import {CartService} from '../../services/cart.service';
import {IProduct} from '../../models/product.model';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  imports: [
    MatDrawerContainer,
    MatDrawerContent,
    MatDrawer,
    ProductsHeaderComponent,
    FiltersComponent,
    MatGridList,
    MatGridTile,
    ProductBoxComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private cartService: CartService) { }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(category: string): void {
    this.category = category;
  }

  onAddToCart(product: IProduct): void {
  this.cartService.addToCart({
    product: product.imageUrl,
    name: product.title,
    price: product.price,
    quantity: 1,
    id: product.id,
  })
  }
}
