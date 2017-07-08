'use strict'

//Cargamos modelo
var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del API REST con Node y Mongo'
    });
}

function saveUser(req, res){
    //Instanciamos el modelo
    var user = new User();

    //Recogemos lo que recibimos del body
    var params = req.body;


    user.name = params.name;
    user.surname =params.surname;
    user.email = params.email;
    user.role = 'ROLE_ADMIN';
    user.image = 'null';

    //Encriptamos passwd

    if(params.password){
        
        bcrypt.hash(params.password, null, null, (err, hash)=>{
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                // Guardar el usuario
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message : 'Error al guardar el usuario'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message : 'No se ha registrado el usuario'});
                        }else{
                            res.status(200).send({user : userStored});
                        }
                    }
                });
            }else{
                res.status(200).send({message : 'Rellena todos los campos'});
            }
        });


    }else{
        res.status(500).send({message : 'Introduce la contraseña'});
    }

}


function loginUser(req, res){

    var params = req.body;

    var email = params.email;
    var password = params.password;

    //Buscamos mediante Mongoose
    User.findOne({email : email.toLowerCase()} , (err, user) => {
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!user){
                res.status(404).send({message: 'El usuario no existe'});
            }else{
                //Comprobar que coincide la passwd
                //user.password viene del callback del metodo findOne
                bcrypt.compare(password, user.password, (err, check) =>{
                    if(check){
                        //devolver los datos del usuario logueado
                        if(params.gethash){
                            //Devolver token jwt
                            //El 'user' que se pasa como parámetro viene del callback de findOne
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }
                });
            }
        }
    });

}


function updateUser(req, res){

    var userId = req.params.id;

    var update = req.body;

    User.findByIdAndUpdate(userId, update , (err, userUpdated) => {

        if(err){
            res.status(500).send({message: 'Error al actualizar el usuario'});
        }else{
            if(!userUpdated){
                res.status(404).send({message: 'No se ha podido actualizar el usuario'});
            }else{
                res.status(200).send({user: userUpdated});
            }
        }
        
    });



}


function uploadImage(req, res){

    var userId = req.params.id;
    var file_name = 'Imagen no subida';

    //files gracias a multipart
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext =ext_split[1].toLowerCase();

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){

            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
                if(!userUpdated){
                     res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                     res.status(200).send({user: userUpdated});
                }
            });

        }else{
             res.status(200).send({message: 'Extension no válida'});
        }

    }else{
        res.status(200).send({message: 'No se ha subido ninguna imagen'});
    }


}




//Aquí exportamos todos los métodos

module.exports = {

    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage

}