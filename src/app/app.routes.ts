import { Routes } from '@angular/router';
import { HomeComponent } from './components/screens/home/home.component';

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
  }
];

export default routeConfig;
