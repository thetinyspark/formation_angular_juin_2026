import { ResolveFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject, Signal } from '@angular/core';
import { Product } from '../model/product';

export const cartResolver: ResolveFn<Signal<Product[]> > = (route, state) => {
  const cartService:CartService = inject(CartService);
  return cartService.load().then( 
    ()=>{
      return cartService.cart$;
    }
  )
};
