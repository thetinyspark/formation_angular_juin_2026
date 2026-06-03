import { inject, Injectable } from '@angular/core';
import { Product } from '../model/product';
import { PRODUCTS } from '../model/mocks/product.mock';
import { combineLatest, firstValueFrom, interval, Observable, of, Subscriber } from 'rxjs';
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
    
    // on va partir du principe que le flux de cet observable 
    // ne sera jamais complété et qu'il va continuer de diffuser 
    // de la data en permanence, cela fait de lui un HOT observable
    const obs1$ = new Observable<number>( 
      (sub:Subscriber<number>)=>{
        const intervalId = setInterval( 
          ()=>{
            console.log("interval loop");
            sub.next( Math.round(Math.random()*1000));
          },
          1000
        ); 


        return ()=>{
          // cette fonction s'éxécute, lorsqu'on se désinscrit de
          // l'observable
          clearInterval(intervalId);
        }

      }

    ); 

    const sub1 = obs1$.subscribe(
      (value:number)=>{
        console.log(value);
      }
    );

    // lorsqu'on se désinscrit la fonction customisée s'éxécute 
    // et met fin à la boucle interne de diffusion de données 
    // au sein de l'observable. ATTENTION ce dernier n'a pas 
    // un flux complété et est donc encore considéré comme "hot"
    setTimeout( 
      ()=>{
        sub1.unsubscribe();
      }, 
      3500
    );
  }


  // promise1 -> stack -> EventLoop JS 
    // est-elle résolue ? 
      // oui -> traitement de la data obtenue de façon synchrone et monothread
      // non -> on passe à la prochaine promise à traiter

  // promise2 -> stack -> EventLoop JS 
  // NodeJS ou Browser accorde un petit temps d'éxécution à chaque promesse dans la EventLoop
}
