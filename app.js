const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const logger = require('morgan');
const methodOverride = require('method-override'); 
const app = express();

// Import fichier indexRoutes : 
const indexRoutes = require('../api/routes/indexRoutes');

// Import fichier mongo.js : 
const mongoDB = require('./db/mongo');

// Connexion à mongoDB :
mongoDB.connexionMongoDB();

// Ajout de dotenv : 
require('dotenv').config();

// Lien avec dossier views et fichiers ejs : 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Autorisation des requêtes externes avec cors() :
app.use(cors());

// Lien avec indexRoutes.js :
app.use('/', indexRoutes);

// Erreur 404 :
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;