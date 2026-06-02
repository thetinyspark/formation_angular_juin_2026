import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _httpClient: HttpClient = inject(HttpClient);
  constructor() { }

  public getCartFromAPI():Observable<Product[]>{
    return this._httpClient.get<Product[]>(environment.cartURL);
  }
}
