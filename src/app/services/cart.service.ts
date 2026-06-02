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

  public removeFromCart(product: Product): void {
    const index = this._cart.indexOf(product);
    if (index !== -1) {
      this._cart.splice(index, 1);
      this.save();
    }
  }

  public getTotalPrice(): number {
    // le fonctionnement de reduce est le suivant :
    // total : c'est la valeur accumulée jusqu'à présent, qui commence à 0 (le deuxième argument de reduce)
    // product : c'est l'élément actuel du tableau sur lequel reduce est en train de travailler
    return this._cart.reduce((total, product) => total + product.price, 0);
  }

  public getTotalPriceTTC(): number {
    const totalHT = this.getTotalPrice();
    const tva = 0.2; // taux de TVA de 20%
    return totalHT * (1 + tva);
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
