
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

    public identity;

    public token;

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    /**
     * 
     * Sirve para loguear el usuario
     * Si le pasamos el gethash nos saca el hash
     */
    signup(user_to_login, gethash = null){

        //console.log(this.url + 'login');

        if(gethash){
            user_to_login.gethash = gethash;
        }


        // Pasamos a string el objeto
        let json = JSON.stringify(user_to_login);
        let params = json;

        //Configuramos cabeceras, como usamos js en el server le pasamos ese content-type
        let headers = new Headers({'Content-Type' : 'application/json'});

        /**
         * Utiliza _http que se ha creado en el constructor , y se le hace una
         * llamada por post a esa url , como segundo parametro se le pasa
         * los params que es el objeto user_to_login
         * y despues un objeto headers
         * 
         * Con map, capturas la respuesta y en el callback recibes la respuesta y codificas 
         * la respuesta en un JSON usable
         */

        return this._http.post(this.url + 'login' , params, {headers: headers})
                          .map(res => res.json());
    }




    register(user_to_register){

        let params = JSON.stringify(user_to_register);

        //Configuramos cabeceras, como usamos js en el server le pasamos ese content-type
        let headers = new Headers({'Content-Type' : 'application/json'});

        return this._http.post(this.url + 'register' , params, {headers: headers})
                          .map(res => res.json());

    }



    updateUser(user_to_update){

        let params = JSON.stringify(user_to_update);

        //Le añadimos la cabecera authorization
        let headers = new Headers(
            {
                'Content-Type' : 'application/json',
                'Authorization' : this.getToken()
            });

        return this._http.put(this.url + 'update-user/' + user_to_update._id , params, {headers: headers}).map(res => res.json());
    }






    getIdentity(){

        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;

    }


    getToken(){

        let token = localStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null
        }

        return this.token;


    }



    






}