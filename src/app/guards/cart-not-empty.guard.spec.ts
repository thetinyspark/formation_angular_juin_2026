import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { cartNotEmptyGuard } from './cart-not-empty.guard';
import { signal } from '@angular/core';
import { Product } from '../model/product';
import { CartService } from '../services/cart.service';
import { PRODUCTS } from '../model/mocks/product.mock';

fdescribe('cartNotEmptyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => cartNotEmptyGuard(...guardParameters));

  class FakeCartService{
    public cart$ = signal<Product[]>([]);
  }

  const cartService = new FakeCartService();

  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: CartService, useValue: cartService}
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if there is at least one product in cart', () => {
    cartService.cart$.set(PRODUCTS);
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBe(true);
  });

  it('should return false if there is no product in cart', () => {
    cartService.cart$.set([]);
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBe(false);
  });
});
