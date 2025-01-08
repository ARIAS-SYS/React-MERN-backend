const path = require('path');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// crear el servdor express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
// TODO: auth // crear, login, renw
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
// CRUD: Eventos

//* En caso de que este en el mismo host

app.use('*', ( req, res ) => {
  res.sendFile( path.join( __dirname, 'public/index.html'));
});

// Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT );
})