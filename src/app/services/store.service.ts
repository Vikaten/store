import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IProduct} from '../models/product.model';
import {Observable} from 'rxjs';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getAllProducts(limit = '12', sort = 'desc', category?: string) : Observable<IProduct[]> {
    return this.http.get<IProduct[]>(
      `${STORE_BASE_URL}/products${
        category ? `/category/` + category : ''
      }?sort=${sort}&limit=${limit}`, {})
  }

  getAllCategories(): Observable<string> {
    return this.http.get<string>(
    `${STORE_BASE_URL}/products/categories`
    )
  }
}
