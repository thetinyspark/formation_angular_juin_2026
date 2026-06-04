import { Component, inject } from '@angular/core';
import { Product } from '../../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../../services/catalog.service';
import { FormsModule } from '@angular/forms';
import { CatalogFilter } from '../../../model/types/CatalogFilter.type';
import { CatalogFilterPipe } from '../../../pipes/catalog-filter.pipe';
import { ProductComponent } from '../../products/product/product.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, CatalogFilterPipe, ProductComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  public products:Product[] = [];
  public platforms:string[] = [];
  public filterName:string = "";
  public filterPlatform:string = "All";
  public filterPriceMin:number = 0;
  public filterPriceMax:number = 100;  
  private _catalogService: CatalogService = inject(CatalogService);
  private _cartService: CartService = inject(CartService);

  public ngOnInit(): void {

    this._catalogService.getProductsFromAPI().subscribe( 
      (products: Product[])=>{
        this.products = products;

        this.platforms = products.map( 
          (product: Product) => product.platform
        ); 

        this.platforms.unshift("All");
      }
    );
  }

  public getCatalogFilter(): CatalogFilter {
    return {
      name: this.filterName,
      platform: this.filterPlatform,
      priceMin: this.filterPriceMin,
      priceMax: this.filterPriceMax
    };
  }

  public onAddToCart(product: Product): void {
    this._cartService.addToCart(product);
  }

}