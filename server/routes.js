// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();
const push = require('./push');

const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {
  
  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});


// Almacenar la suscripción
router.post('/suscribe', (req, res) => {

  res.json('suscribe');

});

// Almacenar la suscripción 
router.get('/key', (req, res) => {

  const key = push.getKey();

  res.send(key);

});

//Enviar notificaciones a quien queramos
router.post('/push', (req, res) => {

  res.json('suscribe');

});

module.exports = router;