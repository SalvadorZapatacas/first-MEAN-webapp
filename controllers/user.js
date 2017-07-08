'use strict'

//Cargamos modelo
var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');

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




//Aquí exportamos todos los métodos

module.exports = {

    pruebas,
    saveUser

}