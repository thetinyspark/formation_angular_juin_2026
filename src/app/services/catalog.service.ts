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

  public async run():Promise<void>{
    const prixTTC = new Promise<number>(
      (resolve, reject) => {
        resolve(120);
        // reject("Une erreur est survenue");
      }
    );

    let price = -1;
    try{
      price = await prixTTC;
    }
    catch(error){
      console.error(error);
    }
    finally{
      console.log(price);
    }

    // prixTTC.then(
    //   (value:number) => {
    //     console.log(value);
    //   }
    // ).catch(
    //   (error) => {
    //     console.error(error);
    //   }
    // ).finally(
    //   () => {
    //     console.log("Le traitement est terminé");
    //   }
    // );

  }
}
