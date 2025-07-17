const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// Ajout de dotenv : 
require('dotenv').config();

// Import des fichiers routes : 
const catwayRouter = require('./routes/catwayRoutes');
const userRouter = require('./routes/userRoutes');
const reservationRouter = require('./routes/reservationRoutes');

// Import fichier mongo.js : 
const mongoDB = require('./db/mongo');

// Connexion à mongoDB :
mongoDB.connexionMongoDB();

// Lien avec dossier views et fichiers ejs : 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Autorisation des requêtes externes avec cors() :
app.use(cors());

// Lien avec mes fichiers routes :
app.use('/catway', catwayRouter);
app.use('/user', userRouter);
app.use('/reservation', reservationRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
