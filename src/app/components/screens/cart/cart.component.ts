import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../model/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _cartService: CartService = inject(CartService);
  public products: Product[] = [];

  public ngOnInit(): void {
      this._cartService.getCartFromAPI().subscribe(
        {
          next: (products) => {
            this.products = products;
          },
          error: (err) => {
            console.error(err);
          }, 
          complete: () => {
            console.log('Cart data retrieval completed.');
          }
        }
    );
  }
}
