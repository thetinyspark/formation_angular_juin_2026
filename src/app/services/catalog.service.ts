import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { PRODUCTS } from '../model/mocks/product.mock';
import { combineLatest, firstValueFrom, forkJoin, interval, map, Observable, of, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployeeWithSalary } from '../model/types/EmployeeWithSalary.type';
import { Salary } from '../model/types/Salary.type';
import { Employee } from '../model/types/Employee.type';
import { subscribe } from 'node:diagnostics_channel';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private _httpClient: HttpClient = inject(HttpClient);
  public intervalId:any = 0;

  constructor() { }

  public getProducts():Product[] {
    return PRODUCTS;
  }

  public getProductsFromAPI():Observable<Product[]> {
    return this._httpClient.get<Product[]>(environment.catalogURL);
  }

  // transforme un observable en promesse
  public getProductsFromAPIPromise():Promise<Product[]>{
    return firstValueFrom(this.getProductsFromAPI());
  }


  private async getEmployees():Promise<Employee[]>{
    try{
      const response = await window.fetch("./assets/employees.json"); 
      const data = await response.json();
      return data as Employee[];
    }
    catch(error){
      console.log(error);
      return [];
    }
  }

  private async getSalaries():Promise<Salary[]>{
    try{
      const response = await window.fetch("./assets/salaries.json"); 
      const data = await response.json();
      return data as Salary[];
    }
    catch(error){
      console.log(error);
      return [];
    }
  }

  private async getEmployeesWithSalaries():Promise<EmployeeWithSalary[]>{
    const data = await Promise.all( [ this.getEmployees(), this.getSalaries() ]);
    const employees = data[0]; 
    const salaries = data[1]; 

    return employees.map( 
      (currentEmployee:Employee)=>{
        return {
          id: currentEmployee.id, 
          name: currentEmployee.name, 
          salary : salaries.find( s=>s.employeeId === currentEmployee.id)?.amount || -1
        } as EmployeeWithSalary
      }
    );
  }

  public async run():Promise<void>{
    const prices1$ = interval(1000).pipe( map( counter => counter ));
    const vat1$ = interval(2000).pipe(map( counter => Math.round(Math.random()*20)));
    const vat = 20; 

    // const realPrices$ = prices1$.pipe( map(
    //   (price:number)=>{
    //     return price * (1+(vat/100));
    //   }
    // ));

    // realPrices$.subscribe(console.log);

    // combineLatest n'attends pas que les flux soient complétés pour diffuser 
    // les dernières données diffusées par les deux flux MAIS, il faut 
    // que chacun des flux ait diffusé au moins UNE donnée avant que combineLatest
    // ne diffuse quoique ce soit. 


    // forkJoin attend que les flux des deux observables soient complétés
    // avant de diffuser la dernière valeur de chacun des flux
    // forkJoin(
    //   {
    //     price: prices1$, 
    //     vat: vat1$
    //   }
    // ).subscribe( 
    //   (data:{price:number, vat:number})=>{
    //     console.log(data.price, data.vat);
    //   }
    // );
    combineLatest(
      {
        vat: vat1$,
        price: prices1$, 
      }
    ).subscribe( 
      (data:{price:number, vat:number})=>{
        console.log(data.price, data.vat);
      }
    );
  }
}
