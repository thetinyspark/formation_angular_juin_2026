import { Component, computed, inject, signal } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../model/product';
import { NgFor } from '@angular/common';
import { ProductComponent } from '../../products/product/product.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor, ProductComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private _cartService: CartService = inject(CartService);
  public products: Product[] = [];
  public totalPriceHT = signal<number>(0);
  public tva = signal<number>(0);
  public totalPriceTTC = computed( 
    ()=>{
      return this.totalPriceHT() * (1+(this.tva()/100));
    }
  );

  public ngOnInit(): void {
      this._cartService.getCartFromAPI().subscribe(
        {
          next: (products) => {
            this.products = products;
            this.totalPriceHT.set( this._cartService.getTotalPrice());
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

  public upTVA():void{
    this.tva.set( this.tva() + 5);
  }

  public downTVA():void{
    this.tva.set( this.tva() - 5);
  }

  public removeFromCart(product: Product): void {
    this._cartService.removeFromCart(product);
  }
}
