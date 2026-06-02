import { Component, inject } from '@angular/core';
import { Product } from '../../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  public products:Product[] = [];
  private _catalogService: CatalogService = inject(CatalogService);

  public ngOnInit(): void {
    this._catalogService.getProductsFromAPI().subscribe( 
      (products: Product[])=>{
        this.products = products;
      }
    )
  }
}
