import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';

import { UserService } from '../services/user.service';

import { Artist } from '../models/artist';

import { ArtistService } from '../services/artist.service';


@Component({
    selector : 'artist-edit',
    templateUrl : '../views/artist-add.html',
    providers: [UserService, ArtistService]
})


export class ArtistEditComponent implements OnInit{

    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage : string;
    public is_edit : boolean;
    


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ){

        this.titulo = 'Crear nuevo artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('','','');
        this.is_edit = true;


    }

    ngOnInit(){

        console.log('artist-add.component.ts cargado');

        //Llamar al metodo del api para sacar un artista en base a su id getArtist

    }

    onSubmit(){
        this._artistService.addArtist(this.token, this.artist).subscribe(
            response => {
                

                if(!response.artist){
                    this.alertMessage = 'Error en el servidor';
                }else{
                    this.alertMessage = 'El artista se ha creado correctamente';
                    this.artist = response.artist;
                    //this._router.navigate(['/editar-artista'], response.artist._id);
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
}