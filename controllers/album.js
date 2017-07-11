'use strict'


var path = require('path');
var fs = require('fs');

//Cargamos esta libreria para paginar
var mongoosePaginate = require('mongoose-pagination');


//Cargamos modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


//Métodos

function getAlbum(req, res){
    var albumId = req.params.id;

    /**
     * Explicación del método populate()
     * Sirve como para hacer un 'join' en mongoose
     * Entonces carga los datos asociados del artista en el Album
     * El path sería la propiedad donde se van a cargar los datos
     * del objeto asociado a esta propiedad, en este caso 'artist',
     * nos cargará un objeto de tipo artista con todos los datos
     * 
     * En RESUMEN, conseguimos todos los datos del artista que 
     * ha creado el album
     */

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album)=>{
        if(err){
            res.status(500).send({message : 'Error en la petición'});
        }else{
            if(!album){
                res.status(404).send({message : 'No existe el album'});
            }else{
                res.status(200).send({album});
            }
        }
    });
}


function getAlbums(req, res){

    var artistId = req.params.artist;

    if(!artistId){
        //Si no existe, sacar todos los albums de la BBDD
        var find = Album.find({}).sort('title');
    }else{
        //Sacar los albums de un artista concreto de la BBDD
        var find = Album.find({artist : artistId}).sort('year');
    }

    find.populate({path : 'artist'}).exec((err, albums) => {
        if(err){
            res.status(500).send({message : 'Error en la petición'});
        }else{
            if(!albums){
                res.status(404).send({message : 'No hay albums'});
            }else{
                res.status(200).send({albums});
            }
        }
    });




    
}









function saveAlbum(req, res){

    //Instanciamos el modelo
    var album = new Album();

    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            if(!albumStored){
                res.status(404).send({message : 'No se ha guardado el album'});
            }else{
                res.status(200).send({album : albumStored});
            }
        }
    });

}







module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums
}