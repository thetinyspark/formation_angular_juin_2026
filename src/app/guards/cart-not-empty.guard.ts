import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CartService } from '../services/cart.service';

export const cartNotEmptyGuard: CanActivateFn = (route, state) => {
  const cartService = inject(CartService);

  // on va chercher notre panier dans le service, puis on envoie le résultat 
  // à l'opérateur map pour vérifier si le panier contient au moins un produit. 
  // Si c'est le cas, on retourne true, sinon false.
  return cartService.cart$().length > 0;
  
};
