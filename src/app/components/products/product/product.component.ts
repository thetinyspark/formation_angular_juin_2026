import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../model/product';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input()
  public product :Product|null = null;

  @Input()
  public detailed :boolean = false;

  @Input()
  public buyable :boolean = false;

  @Output()
  public onAddToCart = new EventEmitter<Product>();

  public addToCart(): void {
    if( this.product != null ) 
      this.onAddToCart.emit(this.product);
  }
}
