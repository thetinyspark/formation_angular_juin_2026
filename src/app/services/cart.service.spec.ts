import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { PRODUCTS } from '../model/mocks/product.mock';

fdescribe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to add a product to the cart and retrieve it', () => {
    service.clear();
    service.addToCart(PRODUCTS[0]);
    expect(service.cart$()).toEqual([ PRODUCTS[0]]);
  });

  it('should be able to remove a product from the cart', () => {
    service.clear();
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[1]);
    service.addToCart(PRODUCTS[2]);
    service.removeFromCart(PRODUCTS[1]);
    
    expect(service.cart$()).toEqual([ PRODUCTS[0], PRODUCTS[2] ]);
  });

  it('should be able to clear the cart', () => {
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[1]);
    service.addToCart(PRODUCTS[2]);
    service.clear();

    expect(service.cart$()).toEqual([]);
  });

  it('should be able to load a cart from localstorage', () => {

    // un spy est un utilitaire permettant de créer qui va espionner les appels à une fonction
    // d'un autre objet, au passage, il peut remplacer l'appel à cette fonction et retourner
    // une toute autre valeur. 
    const spy = spyOn( localStorage, 'getItem' ).and.returnValue( JSON.stringify(PRODUCTS) );
    service.load();

    expect(service.cart$()).toEqual(PRODUCTS);
    expect(spy).toHaveBeenCalled();
  });

  it('should be able to save the cart on localstorage', () => {

    // un spy est un utilitaire permettant de créer qui va espionner les appels à une fonction
    // d'un autre objet, au passage, il peut remplacer l'appel à cette fonction et retourner
    // une toute autre valeur. 
    const storage:any = {};
    const spy = spyOn( localStorage, 'setItem' ).and.callFake(
      (key:string, value:string)=>{
        storage[key] = value;
      }
    );

    service.clear();
    PRODUCTS.forEach( 
      (product)=>{
        service.addToCart(product);
      }
    );

    expect(storage['cart']).toBeDefined();
    expect(storage['cart']).toEqual( JSON.stringify(PRODUCTS));
    expect(spy).toHaveBeenCalled();
  });
});
