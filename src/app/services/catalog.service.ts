import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { PRODUCTS } from '../model/mocks/product.mock';
import { combineLatest, firstValueFrom, forkJoin, interval, map, Observable, of, ReplaySubject, Subject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EmployeeWithSalary } from '../model/types/EmployeeWithSalary.type';
import { Salary } from '../model/types/Salary.type';
import { Employee } from '../model/types/Employee.type';

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
    const obs1$ = new ReplaySubject<number>();
    const obs2$ = new ReplaySubject<number>();
    const obs4$ = new ReplaySubject<number>();
    const obs3$ = combineLatest( {price: obs1$, vat: obs2$}).pipe( map(
      (data:{price:number, vat:number})=>{
        const result = data.price * (1+(data.vat/100));
        obs4$.next(result);
        return result;
      }
    ));

    obs3$.subscribe(()=>{});
    obs2$.next(20);
    
  
    obs1$.next(10);
    obs1$.next(11);
    obs1$.next(1000);
    obs1$.next(1011);
    
    // obs1$.complete();
    // obs2$.complete();
    
    obs4$.subscribe(console.log);

  }
}
