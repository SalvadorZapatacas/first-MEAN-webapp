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

  public errorMessage;

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

                      console.log(token);
                      console.log(identity);

                      
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




}
