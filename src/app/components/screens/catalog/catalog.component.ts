import { Component, inject } from '@angular/core';
import { Product } from '../../../model/product';
import { NgFor } from '@angular/common';
import { CatalogService } from '../../../services/catalog.service';
import { FormsModule } from '@angular/forms';
import { NamePipe } from '../../../pipes/name.pipe';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor, FormsModule, NamePipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  public products:Product[] = [];
  public filterName:string = "";
  private _catalogService: CatalogService = inject(CatalogService);

  public ngOnInit(): void {

    this._catalogService.getProductsFromAPI().subscribe( 
      (products: Product[])=>{
        this.products = products;
      }
    )
  }
}
