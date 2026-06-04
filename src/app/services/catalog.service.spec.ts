import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';
import { Observable, of } from 'rxjs';
import { PRODUCTS } from '../model/mocks/product.mock';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';

fdescribe('CatalogService', () => {
  let service: CatalogService;

  class FakeHttpClient{
    public get(url:string):Observable<Product[]>{
      return of(PRODUCTS);
    }
  }; 

  const fakeHttpClient = new FakeHttpClient();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: fakeHttpClient}
      ]
    });
    service = TestBed.inject(CatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products from http client', () => {
    
    service.getProductsFromAPI().subscribe( 
      (products:Product[])=>{
        expect(products).toEqual(PRODUCTS);
      }
    );

  });
});
