
// Los servicios sirven para comunicarse con las API

//Importamos librerias necesarias
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

//Esto sirve para mapear objetos
import 'rxjs/add/operator/map';
//Y esto para recoger respuestas AJAX del servidor
import { Observable } from 'rxjs/Observable';

//Importamos configuración inicial
import { GLOBAL } from './global';

//Esto sirve para inyectar el servicio en otros componentes/clases por ejemplo
@Injectable()

export class UserService{
    //Aquí guardamos la URL de la API
    public url : string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    signup(){
        return 'Hola mundo desde el servicio';
    }


}