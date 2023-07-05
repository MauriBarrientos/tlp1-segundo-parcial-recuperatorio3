// Imports
const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const morgan = require('morgan');
const {sequelize} = require('./database')
require('ejs');

//Instancia de conexion con el puerto
const port = process.env.PORT || 4500;

//Instancia de conexion a la base de datos
sequelize.authenticate()
    .then(() => console.log('Conexión a base de datos exitosa'))
    .catch((error) => console.log('Error al conectar a base de datos', error));


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Archivos estáticos usando la libreria path de NodeJs
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/reserva.routes'));

// TODO: Si la petición no coincide con ninguna de las rutas declaradas, mostrar error 404

// Starting the server
app.listen(4500, () => console.log(`Servidor escuchando en ${port}`));