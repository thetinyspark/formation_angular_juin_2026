import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart: Product[] = [];
  // private _httpClient: HttpClient = inject(HttpClient);
  constructor() { 
    this.load();
  }

  public getCartFromAPI():Observable<Product[]>{
    return of(this._cart);
    // return this._httpClient.get<Product[]>(environment.cartURL);
  }

  public addToCart(product: Product): void {
    this._cart.push(product);
    this.save();
  }

  private load():void{
    const jsonData:string = localStorage.getItem('cart') || '[]';
    this._cart = JSON.parse(jsonData) as Product[];
  }

  private save():void{
    localStorage.setItem('cart', JSON.stringify(this._cart));
  }

  private clear():void{
    this._cart = [];
    localStorage.removeItem('cart');
  }
}
