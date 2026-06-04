import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

export const cartInterceptor: HttpInterceptorFn = (req, next) => {

  if (environment.cartURL == req.url) {
    let body: any = {};
    
    if (req.method == 'GET') {
      console.log("cartInterceptor:get");
      body = JSON.parse(localStorage.getItem("cart") || '[]');
    } 
    else if (req.method == 'POST') {
      console.log("cartInterceptor:post");
      localStorage.setItem("cart", req.body as string);
      body = JSON.parse(localStorage.getItem("cart") || '[]');
    }

    return of(
      new HttpResponse({
        status: 200,
        body,
      }),
    );
  }

  return next(req);
};
