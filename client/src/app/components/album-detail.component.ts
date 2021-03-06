import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';

import { UserService } from '../services/user.service';

import { Artist } from '../models/artist';

import { Album } from '../models/album';

import { ArtistService } from '../services/artist.service';

import { UploadService } from '../services/upload.service';

import { AlbumService } from '../services/album.service';

@Component({
    selector : 'album-detail',
    templateUrl : '../views/album-detail.html',
    providers: [UserService, ArtistService, AlbumService]
})


export class AlbumDetailComponent implements OnInit{

    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage : string;
    public album: Album;
    


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _albumService : AlbumService
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;


    }

    ngOnInit(){

        console.log('album-detail.component.ts cargado');

        //Sacar album de la bbdd
        this.getAlbum();
        

    }

    getAlbum(){

        console.log('El método funciona');


        //Pillamos los parametros de la URL
        
        this._route.params.forEach( (params : Params) => {
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response => {

                    if(!response.album){
                        this._router.navigate(['/']);
                    }else{
                        this.album = response.album;
                        /*
                        // Sacar los albums del artista

                        this._albumService.getAlbums(this.token, response.artist._id).subscribe(

                            response => {
                                if(!response.albums){
                                    this.alertMessage = 'Este artista no tiene albums todavía';
                                }else{
                                    this.albums = response.albums;
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
                        );
                        */
                    }
                },error => {
                    var errorMessage = <any>error;

                    if(errorMessage != null){
                    var body = JSON.parse(error._body);
                    this.alertMessage = body.message;

                    console.log(error);
                    }
                }
            )
        });


        
    }

   

    

    
    

}