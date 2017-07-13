import { Component , OnInit } from '@angular/core';

//Importamos servicio
import { UserService } from './services/user.service';


//Importamos modelo usuario
import { User } from './models/user';



//inyeccion de dependencias e incluimos el servicio
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'MUSIFY!';
  public user : User;

  //Aquí van los datos del usuario logueado
  public identity;
  
  public token;

  // Asigna valor a las propiedades ( un constructor vaya ...)
  //Más adelante mediante formulario se irán metiendo valores
  constructor(
    private _userService : UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');

  }

  /**
   * Sirve para ejecutar codigo nada mas cargar el componente
   * ngOnInit viene de una interfaz que tenemos que implementar
   */
  ngOnInit(){
    var texto = this._userService.signup();
    console.log(texto);
  }

  public onSubmit(){
    console.log(this.user);
  }




}
