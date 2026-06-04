import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { Observable, of } from 'rxjs';
import { Product } from '../../../model/product';
import { PRODUCTS } from '../../../model/mocks/product.mock';
import { HttpClient } from '@angular/common/http';

fdescribe('CatalogComponent', () => {


  class FakeHttpClient{
    public get(url:string):Observable<Product[]>{
      return of(PRODUCTS);
    }
  }; 

  const fakeHttpClient = new FakeHttpClient();

  let componentDOM:HTMLElement;
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogComponent], 
      providers: [
        {provide:HttpClient, useValue: fakeHttpClient}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogComponent);
    componentDOM = fixture.nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all products', () => {
    const products = Array.from(componentDOM.querySelectorAll(".product"));
    expect(products.length).toEqual(PRODUCTS.length);
  });

  it('products title should be accurate', () => {
    const products = Array.from(componentDOM.querySelectorAll(".product h3"));
    const names = products.map( (h3:Element) => h3.innerHTML );

    PRODUCTS.forEach( 
      (currentProduct)=>{
        expect(names).toContain(currentProduct.name);
      }
    );
  });

  it('should filter products according to name', () => {
    component.filterName = PRODUCTS[0].name;
    fixture.detectChanges();

    const products = Array.from(componentDOM.querySelectorAll(".product h3"));
    const names = products.map( (h3:Element) => h3.innerHTML );

    names.forEach( 
      (currentName)=>{
        expect(currentName).toContain(PRODUCTS[0].name);
      }
    );
  });


});
