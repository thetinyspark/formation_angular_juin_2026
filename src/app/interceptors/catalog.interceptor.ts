import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PRODUCTS } from '../model/mocks/product.mock';
import { Observable, of, Subscriber } from 'rxjs';

export const catalogInterceptor: HttpInterceptorFn = (req, next) => {

  // permet de simuler le comportement du serveur , on n'a plus besoin 
  // de tricher avec notre service en attendant que le back end soit dispo. 
  // bonus non négligeable, c'est utilisable pour bouchonner les tests

  // on peut utiliser des interceptors pour définir des headers ( par exemple des bearer token)
  // on peut aussi utiliser des interceptors pour communiquer avec l'API à notre place
  // et du coup , on peut gérer également les erreurs serveurs au sein d'un interceptor
  if( req.method == "GET" && req.url == environment.catalogURL){
    return of(
      new HttpResponse({
        status: 200, 
        body: PRODUCTS
      })
    );
  }

  return next(req);
  
};
