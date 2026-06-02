import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';
import { CatalogFilter } from '../model/types/CatalogFilter.type';
import { NamePipe } from './name.pipe';
import { PlatformPipe } from './platform.pipe';
import { PricePipe } from './price.pipe';

@Pipe({
  name: 'catalogFilter',
  standalone: true
})
export class CatalogFilterPipe implements PipeTransform {

  transform(products: Product[], filter: CatalogFilter): Product[] {
    let results = []; 
    const namePipe = new NamePipe();
    const platformPipe = new PlatformPipe();
    const pricePipe = new PricePipe();

    results = namePipe.transform(products, filter.name);
    results = platformPipe.transform(results, filter.platform);
    results = pricePipe.transform(results, filter.priceMin, filter.priceMax);
    return results;
  }

}
