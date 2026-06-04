import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { isConnectedGuard } from './is-connected.guard';
import { LoginService } from '../services/login.service';

// approche TDD
// Test Driven Development
// TDD est une approch de conception qui fonctionne selon le cycle suivant: 

// 1.Je détermine un cas d'usage pour ma fonctionnalité 
// 2.Ma fonctionnalité ne remplit pas ce cas d'usage (test rouge)
// 3.J'affine mon algorithme afin que ma fonctionnalité remplisse mon cas d'usage

// Répéter les étapes 1 à 3 , jusqu'à ce que la fonctionnalité remplisse l'intégralité
// des cas d'usages. 

// Le but étant de raffiner l'algorithme au plus proche de la fonctionnalité et de créer
// ainsi la fonctionnalité la moins gourmande possible (anti pattern feature Envy)

fdescribe('isConnectedGuard', () => {

  // executeGuard est une fonction utilitaire permettant d'éxécuter notre guard
  // dans un contexte d'injection de dépendances, puisque le projet front-end 
  // n'est pas démarré lors de la phase de test, il faut bien un contexte d'injection
  // afin de tester les éléments qui utilisent inject(...)
  const executeGuard: CanActivateFn = (...guardParameters) => {
    return TestBed.runInInjectionContext(
      () => isConnectedGuard(...guardParameters)
    );
  }

  class FakeLoginService{
    public loggedIn:boolean = true;
    isConnected (){
      return this.loggedIn;
    }
  }
  const fakeLoginService = new FakeLoginService();

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers: [
          {provide: LoginService, useValue: fakeLoginService},
          {provide: ActivatedRouteSnapshot, useValue: {}},
          {provide: RouterStateSnapshot, useValue: {}},
        ]
      }
    );
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    fakeLoginService.loggedIn = true;
    const result = executeGuard ({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBe(true);
  });

  it('should return false if user is not logged in', () => {
    fakeLoginService.loggedIn = false;
    const result = executeGuard ({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(result).toBe(false);
  });


});
