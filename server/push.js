const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');
const fs = require('fs');

let  suscripciones = require('./subs-db.json');

const webpush = require('web-push');

webpush.setVanidDetails(
    'mailto:yessgarciacampos@outlook.es',
    vapid.publicKey,
    vapid.privateKey
);

module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};

module.exports.addSubscription = ( suscripcion ) => {

    suscripciones.push( suscripcion );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) );

};

module.exports.sendPush = ( post ) => {
    console.log('Mandando PUSHES');

    let notificacionesEnviadas = [];

    suscripciones.forEach( (suscripcion, i) => {


        const pushProm = webpush.sendNotification( suscripcion, JSON.stringify( post ) )
        .then( console.log('Notificación enviada') )
        .catch( err => {

            console.log('Notificación falló');

            if ( err.statusCode === 410 ) {
                suscripciones[i].borrar = true;
            }
        });

        notificacionesEnviadas.push( pushProm );

    });

    Promise.all( notificacionesEnviadas ).then( () => {

        suscripciones = suscripciones.filter( subs => !subs.borrar );

        fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) );
    });

};