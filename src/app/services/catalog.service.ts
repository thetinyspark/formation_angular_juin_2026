import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { PRODUCTS } from '../model/mocks/product.mock';
import { combineLatest, firstValueFrom, forkJoin, interval, map, Observable, of, Subscriber } from 'rxjs';
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
    
    const employees$ = new Observable<Employee>( 
      (sub:Subscriber<Employee>)=>{
        const exec = async ()=>{
          const employees = await this.getEmployees();          
          const intervalId = setInterval( 
            ()=>{
              if( employees.length > 0 )
                sub.next(employees.pop());
              else{
                clearInterval(intervalId);
                sub.complete();
              }
            }, 
            1000
          )
        };

        exec();
      }
    );

    const salaries$ = new Observable<Salary>( 
      (sub:Subscriber<Salary>)=>{
        const exec = async ()=>{
          const salaries = await this.getSalaries();          
          const intervalId = setInterval( 
            ()=>{
              if( salaries.length > 0 )
                sub.next(salaries.pop());
              else{
                clearInterval(intervalId);
                sub.complete();
              }
            }, 
            1000
          )
        };

        exec();
      }
    );

    const result = combineLatest(
      {
        salary: salaries$, 
        employee: employees$,
      }
    ).pipe( 

      map(
        (data:{employee:Employee, salary:Salary})=>{
          return {
            id: data.employee.id, 
            name: data.employee.name, 
            salary: data.salary.employeeId == data.employee.id ? data.salary.amount : -1
          }
        }
      )
    );


    result.subscribe(console.log);
  }
}
