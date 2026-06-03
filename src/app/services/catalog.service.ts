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


  private async getPriceHT():Promise<number>{
    try{
      const response = await window.fetch("./assets/price.json"); 
      const data = await response.json();
      return data.value as number;
    }
    catch(error){
      console.log(error);
      return 0;
    }
  }

  private async getVAT():Promise<number>{
    try{
      const response = await window.fetch("./assets/tva.json"); 
      const data = await response.json();
      return data.value as number;
    }
    catch(error){
      console.log(error);
      return 0;
    }
  }

  private getPriceAndVat():Promise<[number, number]>{
    return Promise.all( [ this.getPriceHT(), this.getVAT() ]);
  }

  public async run():Promise<void>{
    const data = await this.getPriceAndVat();
    const price = data[0] * (1+(data[1]/100));
    console.log(price);
  }


  // promise1 -> stack -> EventLoop JS 
    // est-elle résolue ? 
      // oui -> traitement de la data obtenue de façon synchrone et monothread
      // non -> on passe à la prochaine promise à traiter

  // promise2 -> stack -> EventLoop JS 
  // NodeJS ou Browser accorde un petit temps d'éxécution à chaque promesse dans la EventLoop
}
