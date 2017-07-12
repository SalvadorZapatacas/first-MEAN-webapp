'use strict'


var jwt = require('jwt-simple');

//moment sirve para añadir fechas al token para que caduque.
var moment = require('moment');

var secret = ':roto2:';


/**
 * Le pasamos un objeto user a codificar.
 * La variable payload son los datos que se van a codificar.
 * 
 * La propiedad sub sirve para guardar el 'id' de la BBDD
 * La propiedad iat se guarda el tiempo cuando fue creado en formato unix
 * La propiedad exp es cuando expira el token
 */
exports.createToken = function(user){


    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    // El hash se cifrara con la clave secret

    return jwt.encode(payload, secret);

};