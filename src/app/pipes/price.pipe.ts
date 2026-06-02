import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform(products: Product[], min:number = 0, max:number = Infinity): Product[] {
    return products.filter( (product: Product) => {
      return product.price >= min && product.price <= max;
    });
  }

}
