'use strict'


var jwt = require('jwt-simple');

//moment sirve para añadir fechas al token para que caduque.
var moment = require('moment');

var secret = ':roto2:';


exports.ensureAuth = function(req, res, next){

    if(!req.headers.authorization){
        return res.status(403).send({message : 'La petición no tiene la cabecera de authenticación'});
    }

    //Quitamos las comillas del token
    var token = req.headers.authorization.replace(/['"]+/g, '');

    //Decodificamos el token
    try{

        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message : 'El token ha expirado'});
        }


    }catch(ex){
        console.log(ex);
        return res.status(404).send({message : 'Token no válido'});

    }

    req.user = payload;

    next();

}