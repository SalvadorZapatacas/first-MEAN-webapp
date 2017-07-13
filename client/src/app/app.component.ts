import { Component } from '@angular/core';

//Importamos modelo usuario
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public title = 'MUSIFY!';
  public user : User;

  //Aquí van los datos del usuario logueado
  public identity;
  
  public token;

  // Asigna valor a las propiedades ( un constructor vaya ...)
  //Más adelante mediante formulario se irán metiendo valores
  constructor(){
    this.user = new User('','','','','','ROLE_USER','');

  }

}
