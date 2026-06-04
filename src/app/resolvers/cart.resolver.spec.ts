import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { cartResolver } from './cart.resolver';
import { Signal } from '@angular/core';
import { Product } from '../model/product';

describe('cartResolver', () => {
  const executeResolver: ResolveFn<Signal<Product[]>> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => cartResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
