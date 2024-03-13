import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'dashboard', component: DashboardComponent },  
];
