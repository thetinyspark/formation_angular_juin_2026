import { computed, effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Product } from '../model/product';
// import { Observable, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cart$ = signal<Product[]>([]);
  private _tva$ = signal<number>(0);

  // tous les signaux au public sont en readOnly afin d'éviter 
  // de multiplier les sources de vérité. 
  public totalPriceHT$ = computed( 
    ()=>{
        // le fonctionnement de reduce est le suivant :
        // total : c'est la valeur accumulée jusqu'à présent, qui commence à 0 (le deuxième argument de reduce)
        // product : c'est l'élément actuel du tableau sur lequel reduce est en train de travailler
        return this._cart$().reduce((total, product) => total + product.price, 0);
    }
  );

  public totalPriceTTC$ = computed( 
    ()=>{
      return this.totalPriceHT$() * (1+(this._tva$()/100));
    }
  );

  public cart$ = this._cart$.asReadonly();
  public tva$ = this._tva$.asReadonly();
  private _cart: Product[] = [];

  constructor() { 
    this.load();
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

  public setTVA(value:number):void{
    this._tva$.set(value);
  }


  private load():void{
    const jsonData:string = localStorage.getItem('cart') || '[]';
    this._cart = JSON.parse(jsonData) as Product[];
    this._cart$.set(this._cart);
  }

  private save():void{
    this._cart$.set(this._cart);
    localStorage.setItem('cart', JSON.stringify(this._cart));
  }

  private clear():void{
    this._cart = [];
    this._cart$.set(this._cart);
    localStorage.removeItem('cart');
  }
}
