import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart: Product[] = [];
  private _httpClient: HttpClient = inject(HttpClient);
  constructor() { }

  public getCartFromAPI():Observable<Product[]>{
    return this._httpClient.get<Product[]>(environment.cartURL);
  }

  public addToCart(product: Product): void {
    this._cart.push(product);
    console.log("Product added to cart : ", this._cart); 
  }
}
