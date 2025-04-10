import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/home/components/cart/cart.component';
import { LoginPageComponent } from './pages/authorization/login-page/login-page.component';
import { SignupUpPageComponent } from './pages/authorization/signup-up-page/signup-up-page.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'cart', component: CartComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'signup', component: SignupUpPageComponent},

];
