import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { PRODUCTS } from '../model/mocks/product.mock';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private _httpClient: HttpClient = inject(HttpClient);

  constructor() { }

  public getProducts():Product[] {
    return PRODUCTS;
  }

  public getProductsFromAPI():Observable<Product[]> {
    return this._httpClient.get<Product[]>(environment.catalogURL);
  }


  private getPriceHT():Promise<number>{
    return new Promise<number>(
      (resolve, reject)=>{
        setTimeout( 
          ()=>{
            resolve(100);
          }, 
          1000
        )
      }
    );
  }

  private getVAT():Promise<number>{
    return new Promise<number>(
      (resolve, reject)=>{
        setTimeout( 
          ()=>{
            resolve(20);
          }, 
          1000
        )
      }
    );
  }

  public async run():Promise<void>{
    const vat = await this.getVAT();
    const price = await this.getPriceHT() * (1+(vat/100));
    console.log(price);
  }
}
