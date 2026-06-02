import { Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';
import { CatalogComponent } from './components/screens/catalog/catalog.component';
import { CartComponent } from './components/screens/cart/cart.component';
import { LoginComponent } from './components/screens/login/login.component';

// Configuration of the routes of the application
const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'catalog',
    component: CatalogComponent,
    title: 'Catalog page'
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'Cart page'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page'
  }
];

export default routeConfig;
