import { Component , OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';


//Importamos servicio
import { UserService } from './services/user.service';


//Importamos modelo usuario
import { User } from './models/user';

import { GLOBAL } from './services/global';



//inyeccion de dependencias e incluimos el servicio
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'MUSIFY!';
  public user : User;
  public user_register : User;

  //Aquí van los datos del usuario logueado
  public identity;
  
  public token;

  public errorMessage;

  public alertRegister;

  public url : string;

  // Asigna valor a las propiedades ( un constructor vaya ...)
  //Más adelante mediante formulario se irán metiendo valores
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService : UserService
  ){
    this.user = new User('','','','','','ROLE_USER','');
    this.user_register = new User('','','','','','ROLE_USER','');
    this.url = GLOBAL.url;

  }

  /**
   * Sirve para ejecutar codigo nada mas cargar el componente
   * ngOnInit viene de una interfaz que tenemos que implementar
   */
  ngOnInit(){
    
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    console.log(this.identity);
    console.log(this.token);

  }

  public onSubmit(){
    console.log(this.user);

    // .subscribe() -> Observable

    //Conseguimos los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response => {
        let identity = response.user;
        this.identity = identity;

        if(!this.identity._id){
          alert('El usuario no está correctamente identificado');
        }else{
          // Creamos elemento (sesion) en el localstorage para tener el usuario en sesion

          localStorage.setItem('identity', JSON.stringify(identity));





          //Conseguir el token para enviarselo a cada petición http

            // Al ponerle 'true' , ahora nos devolverá un token
                this._userService.signup(this.user , 'true').subscribe(
                  response => {
                    let token = response.token;
                    this.token = token;

                    if(this.token.length <= 0){
                      alert('El token no se ha generado correctamente');
                    }else{
                        // Creamos elemento (sesion) en el localstorage para tener el token disponible
                        //No hace falta pasar el token a String porque ya lo es
                      localStorage.setItem('token', token);
                      this.user = new User('','','','','','ROLE_USER','');
                    }

                  },
                  error => {
                    var errorMessage = <any>error;

                    if(errorMessage != null){
                      var body = JSON.parse(error._body);
                      this.errorMessage = body.message;

                      console.log(error);
                    }
                  }
                );


          
        }

      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;

          console.log(error);
        }
      }
    );

  }



  logout(){
    // Esto hace un borrado de todo , pero tambien se podria borrar items con .removeItem('identity');
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this.user = new User('','','','','','ROLE_USER','');

    this._router.navigate(['/']);
  }


  onSubmitRegister(){
    console.log(this.user_register);

    this._userService.register(this.user_register).subscribe(
      response => {

        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        }else{
          this.alertRegister = 'El registro se ha realizado con éxito, identificate con ' + this.user_register.email;
          this.user_register = new User('','','','','','ROLE_USER','');
        }

      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;

          console.log(error);
        }
      }
    );
  }




}
