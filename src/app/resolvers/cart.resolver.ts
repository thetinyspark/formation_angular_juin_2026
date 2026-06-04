import { ResolveFn } from '@angular/router';
import { CartService } from '../services/cart.service';
import { inject, Signal } from '@angular/core';
import { Product } from '../model/product';
import { PreloadingService } from '../services/preloading.service';

export const cartResolver: ResolveFn<Signal<Product[]> > = (route, state) => {
  const cartService:CartService = inject(CartService);
  const preloadingService:PreloadingService = inject(PreloadingService);

  preloadingService.isLoading.set(true); 
  const exec = async()=>{
    await new Promise( (resolve)=>setTimeout( resolve, 5000));
    await cartService.load();
    preloadingService.isLoading.set(false);
    return cartService.cart$;
  }

  return exec();
};
