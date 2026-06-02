import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'platform',
  standalone: true
})
export class PlatformPipe implements PipeTransform {

  transform(products: Product[], platform:string = ""): Product[] {
    if( platform.toLowerCase() === "all" ) {
      return products;
    }
    
    return products.filter( (product: Product) => {
      return product.platform.toLowerCase() === platform.toLowerCase();
    });
  }

}
