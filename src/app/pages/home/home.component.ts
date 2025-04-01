import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Subscription} from 'rxjs';
import {StoreService} from '../../services/store.service';
import {NgForOf} from '@angular/common';

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
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: IProduct[] | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts() {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe(_products => this.products = _products);
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts()
  }

  onAddToCart(product: IProduct): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }

  onItemsCountChange(count: number) {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts()
  }

  ngOnDestroy() {
    if(this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
