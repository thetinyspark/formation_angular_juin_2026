import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'name',
  standalone: true
})
export class NamePipe implements PipeTransform {

  transform(products: Product[], name:string = ""): Product[] {
    return products.filter( (product: Product) => {
      return product.name.toLowerCase().includes(name.toLowerCase());
    });
  }

}
