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

function getArtist(req, res){
    
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}




function saveArtist(req, res){

    var artist = new Artist();
    var params = req.body;

    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err , artistStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}


function getArtists(req, res){

    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    
    var itemsPerPage = 3;

    //.paginate() es de la libreria mongoose-pagination
    Artist.find().sort('name').paginate(page, itemsPerPage , (err, artists, total) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas'});
            }else{
                // Le ponemos return para asegurarnos que funciona siempre

                return res.status(200).send({
                    total_items: total,
                    artist: artists
                });
            }
        }
    });

}


function updateArtist(req, res){

    var artistId = req.params.id;
    var update = req.body;


    Artist.findByIdAndUpdate(artistId, update , (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al actualizar el artista'});
        }else{
            if(!artistUpdated){
                 res.status(404).send({message: 'El artista no ha sido actualizado'});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    });


}


/**
 * 
 * Este método , borrará el artista, pero tambien su album asociado
 * y las canciones asociadas a este.
 * 
 */

function deleteArtist(req, res){

    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId , (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al borrar'});
        }else{
            if(!artistRemoved){
                 res.status(404).send({message: 'El artista no ha sido eliminado'});
            }else{
                

                //Eliminamos los album

                Album.find({artist : artistRemoved._id}).remove((err, albumRemoved) =>{
                    if(err){
                        res.status(500).send({message: 'Error al eliminar el album'});
                    }else{
                        if(!albumRemoved){
                            res.status(404).send({message: 'El album no ha sido eliminado'});
                        }else{

                            // Eliminamos las canciones


                            Song.find({album : albumRemoved._id}).remove((err, songRemoved) =>{
                                if(err){
                                    res.status(500).send({message: 'Error al eliminar las cancione'});
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message: 'La cancion no ha sido eliminada'});
                                    }else{
                                        res.status(200).send({artist: artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
            

}


function uploadImage(req, res){

    var artistId = req.params.id;
    var file_name = 'Imagen no subida';

    //Recogemos los ficheros de la req
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext =ext_split[1].toLowerCase();

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                if(!artistUpdated){
                     res.status(404).send({message: 'No se ha podido actualizar el artista'});
                }else{
                     res.status(200).send({artist: artistUpdated});
                }
            });

        }else{
             res.status(200).send({message: 'Extension no válida'});
        }

    }else{
        res.status(200).send({message: 'No se ha subido ninguna imagen'});
    }


}


function getImageFile(req, res){

    var imageFile = req.params.imageFile;

    var path_file = './uploads/artists/'+imageFile;

    //Comprobamos si existe el fichero en el servidor
    fs.exists(path_file , (exists) =>{
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
             res.status(200).send({message: 'No existe la imagen'});
        }
    });




}




module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
}
