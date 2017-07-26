import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Import user
import { UserEditComponent } from './components/user-edit.component';


const appRoutes : Routes = [
    
    { path : '' , component: UserEditComponent },
    { path : 'mis-datos' , component: UserEditComponent },
    { path : '**' , component: UserEditComponent } 

];


//necesario para el router
//Creo que esto no hace falta ya que usamos ModuleWithProviders, pero bueno...
export const appRoutingProviders : any[] = [];

export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);