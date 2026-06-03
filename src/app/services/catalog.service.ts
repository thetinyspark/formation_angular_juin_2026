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
    

    const obs1$ = new Observable<number>( 
      (sub:Subscriber<number>)=>{
        const intervalId = setInterval( 
          ()=>{
            console.log("interval loop");
            sub.next( Math.round(Math.random()*1000));
          },
          1000
        ); 

        setTimeout( 
          ()=>{
            clearInterval(intervalId);
            sub.complete();
          }, 
          3500
        );
      }
    ); 

    // le mot clé interval de rxjs permet de créer 
    // un observable qui diffuse une donnée toutes les x 
    // millisecondes
    interval(1000).subscribe(console.log);

    obs1$.subscribe(
      {
        // lorsqu'une donnée est diffusée au sein de l'observable
        next: (value:number)=>{
          console.log(value);
        },
        
        // la deuxième fonctionn gère les erreurs 
        error: (error)=>{
          console.log(error);
        }, 
        // la troisième fonction gère la complétion/fermeture du flux
        complete: ()=>{
          console.log("le flux est complété/fermé");
        }
      }
    );
  }


  // promise1 -> stack -> EventLoop JS 
    // est-elle résolue ? 
      // oui -> traitement de la data obtenue de façon synchrone et monothread
      // non -> on passe à la prochaine promise à traiter

  // promise2 -> stack -> EventLoop JS 
  // NodeJS ou Browser accorde un petit temps d'éxécution à chaque promesse dans la EventLoop
}
