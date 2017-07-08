'use strict'


function pruebas(req, res){
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del API REST con Node y Mongo'
    });
}




//Aquí exportamos todos los métodos

module.exports = {

    pruebas

}