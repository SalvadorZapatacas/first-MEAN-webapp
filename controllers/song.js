'use strict'


var path = require('path');
var fs = require('fs');

//Cargamos esta libreria para paginar
var mongoosePaginate = require('mongoose-pagination');


//Cargamos modelos
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');


function getSong(req , res){

    var songId = req.params.id;

    //Significa que en la propiedad album , saque un objeto con toda la informacion
    //del album al que esta asociado
    Song.findById(songId).populate({path : 'album'}).exec((err, song) => {
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            if(!song){
                res.status(404).send({message : 'No existe la canción'});
            }else{
                res.status(200).send({song});
            }
        }
    });
}


function getSongs(req, res){

    var albumId = req.params.album;

    if(!albumId){
        var find = Song.find({}).sort('number');
    }else{
        var find = Song.find({album : albumId}).sort('number');
    }

    /**
     * A continuación , además de popular el album, lo que hacemos es crear otra propiedad 
     * que se llame populate y le pasamos un objeto y hacemos lo mismo y hay que indicarle también
     * el modelo y el path.
     * 
     * En este caso lo que estamos haciendo es sacar una cancion y en su propiedad album sacar tambien 
     * toda la información de ese album y ADEMÁS , en ese album incluir toda la información del artista
     * Recuerda que hay que indicarle el modelo tambien
     */
    find.populate({
        path : 'album',
        populate : {
            path : 'artist',
            model : 'Artist'
        }
    }).exec((err, songs) => {
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            if(!songs){
                res.status(404).send({message : 'No hay canciones'});
            }else{
                res.status(200).send({songs});
            }
        }
    });


}



function saveSong(req, res){

    var song = new Song();

    var params = req.body;

    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = 'null';
    song.album = params.album;

    song.save((err, songStored) => {
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            if(!songStored){
                res.status(404).send({message : 'No se ha guardado la canción'});
            }else{
                res.status(200).send({song : songStored});
            }
        }
    });


}


function updateSong(req, res){

    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update , (err, songUpdated) => {
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            if(!songUpdated){
                res.status(404).send({message : 'No se ha actualizado la canción'});
            }else{
                res.status(200).send({song : songUpdated});
            }
        }
    });

}


function deleteSong(req, res){

    var songId = req.params.id;
    
    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if(err){
            res.status(500).send({message : 'Error en el servidor'});
        }else{
            if(!songRemoved){
                res.status(404).send({message : 'No se ha borrado la canción'});
            }else{
                res.status(200).send({song : songRemoved});
            }
        }
    });


}



function uploadFile(req, res){

    var songId = req.params.id;
    var file_name = 'Imagen no subida';

    //Recogemos los ficheros de la req
    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext =ext_split[1].toLowerCase();

        if(file_ext == 'mp3' || file_ext == 'ogg'){

            Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
                if(!songUpdated){
                     res.status(404).send({message: 'No se ha podido actualizar la canción'});
                }else{
                     res.status(200).send({song: songUpdated});
                }
            });

        }else{
             res.status(200).send({message: 'Extension no válida'});
        }

    }else{
        res.status(200).send({message: 'No se ha subido ningun archivo'});
    }


}




function getSongFile(req, res){

    var imageFile = req.params.songFile;

    var path_file = './uploads/songs/'+imageFile;

    //Comprobamos si existe el fichero en el servidor
    fs.exists(path_file , (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
             res.status(200).send({message: 'No existe el fichero de audio'});
        }
    });




}



module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
    
}