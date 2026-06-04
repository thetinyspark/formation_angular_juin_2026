import { Component, inject } from '@angular/core';
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
  public products = this._cartService.cart$;
  public totalPriceTTC = this._cartService.totalPriceTTC$;
  public totalPriceHT = this._cartService.totalPriceHT$;
  public tva = this._cartService.tva$;

  public upTVA():void{
    this._cartService.setTVA( this.tva() + 5);
  }

  public downTVA():void{
    this._cartService.setTVA( this.tva() - 5);
  }

  public removeFromCart(product: Product): void {
    this._cartService.removeFromCart(product);
  }
}
