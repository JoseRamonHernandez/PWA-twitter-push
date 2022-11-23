const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');
const fs = require('fs');

const suscripciones = require('./subs-db.json');

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


    suscripciones.forEach( (suscripcion, i) => {


        webpush.sendNotification( suscripcion, JSON.stringify( post )  );


    });


};