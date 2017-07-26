import { Component, OnInit } from '@angular/core';


import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { User } from '../models/user';



@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [ UserService ]
})



export class UserEditComponent implements OnInit{

    public titulo : string;
    public user : User;
    public identity;
    public token;
    public alertMessage;
    public url : string;
    public filesToUpload: Array<File>;

    constructor(
        private _userService : UserService
    ){
        
        this.titulo = 'Actualizar mis datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }



    ngOnInit(){
        console.log('user-edit.component cargado');
    }


    onSubmit(){
        //console.log(this.user);

        this._userService.updateUser(this.user).subscribe(
            response => {
                if(!response.user){
                    this.alertMessage = 'El usuario no se ha actualizado';
                }else{

                    //this.user = response.user;

                    localStorage.setItem('identity', JSON.stringify(this.user));

                    document.getElementById('identity_name').innerHTML = this.user.name;

                   

                    if(!this.filesToUpload){
                        //redirección
                        //Debug
                        console.log('error , !this.filesToUpload');
                    }else{
                        this.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [] , this.filesToUpload).then(
                                (result : any) => {
                                    //console.log(result);
                                    this.user.image = result.image;
                                    localStorage.setItem('identity', JSON.stringify(this.user));

                                    console.log(this.user);
                                }
                            );
                    }
                    
                    this.alertMessage = 'Los datos se han actualizado correctamente';
                }
            },
            error => {
                        var errorMessage = <any>error;

                        if(errorMessage != null){
                            var body = JSON.parse(error._body);
                            this.alertMessage = body.message;
                            console.log(error);
                        }
                    }
        )
    }

    



    fileChangeEvent(fileInput : any){

        //Esto pilla los archivos que pilla en el input
        this.filesToUpload = <Array<File>> fileInput.target.files;

        console.log(this.filesToUpload);
    }

    //Peticion AJAX para subir imagen
    makeFileRequest(url: string, params: Array<string>, files: Array<File>){

        var token = this.token;

        return new Promise((resolve, reject) => {

            //Simulamos un formulario 
            //Por cierto , 2 horas para solucionar que no era 'formData()', si no 'FormData()'  ... lmao
            var formData : any = new FormData();

            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append('image', files[i] , files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            }
            //Lanzamos peticion
            xhr.open("POST", url , true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);

        });
        

    }




}