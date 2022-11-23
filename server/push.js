const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');
const fs = require('fs');

const suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlsafeBase64.decode( vapid.publicKey );
};

module.exports.addSubscription = ( suscripcion ) => {

    suscripciones.push( suscripcion );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) );

};