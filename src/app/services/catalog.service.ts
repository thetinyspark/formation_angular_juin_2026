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
  public sub3:ReplaySubject<EmployeeWithSalary> = this.getStreamingEmployeeWithSalary();

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

  private getStreamingEmployee():ReplaySubject<Employee>{
    const sub$ = new ReplaySubject<Employee>();
    this.getEmployees().then( 
      (employees:Employee[])=>{
        const inter = setInterval( 
          ()=>{
            if( employees.length > 0 )
              sub$.next( employees.pop() as Employee )
            else{
              clearInterval(inter);
              console.log("employees completed");
              sub$.complete();
            }
          }, 
          1000
        )
      }
    )
    return sub$;
  }

  private getStreamingSalary():ReplaySubject<Salary>{
    const sub$ = new ReplaySubject<Salary>();
    this.getSalaries().then( 
      (salaries:Salary[])=>{
        const inter = setInterval( 
          ()=>{
            if( salaries.length > 0 )
              sub$.next( salaries.pop() as Salary )
            else{
              clearInterval(inter);
              console.log("salaries completed");
              sub$.complete();
            }
          }, 
          2000
        )
      }
    )
    return sub$;
  }

  private getStreamingEmployeeWithSalary():ReplaySubject<EmployeeWithSalary>{
    const sub$ = new ReplaySubject<EmployeeWithSalary>();
    combineLatest({
      employee: this.getStreamingEmployee(), 
      salary: this.getStreamingSalary()
    }).subscribe( 
      (data: {employee:Employee, salary: Salary})=>{
        sub$.next(
          {
            id: data.employee.id, 
            name: data.employee.name, 
            // salary: data.employee.id === data.salary.employeeId ? data.salary.amount : -1
            salary: data.salary.amount
          }
        )
      }
    );
    return sub$;
  }

  public async run():Promise<void>{
    
    this.sub3.subscribe( 
      (value)=>{
        console.log("channel 1: ", value);
      }
    )
    setTimeout( 
      ()=>{
        this.sub3.subscribe(
          (value)=>{
            console.log("channel 2: ", value);
          }
        );
      }, 
      10000
    )
  }
}
