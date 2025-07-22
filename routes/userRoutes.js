const express = require('express');
const router = express.Router();

// Lien fichier userService.js : 
const userController = require('../controllers/userControllers');

/* Lien avec le middleware */
const userPrivate = require('../middlewares/userPrivate');

/*Méthode GET : afficher l'ensemble des utilisateurs*/
router.get('/', userController.getAllUsers);

/*Méthode GET : lire informations utilisateur */
router.get('/:id', userPrivate.checkJWT, userController.getUserId);

/*Méthode POST : ajouter un utilisateur */
router.post('/add', userController.createUser);

/*Méthode PUT : modifier un utilisateur */
router.put('/:id', userPrivate.checkJWT, userController.updateUser);

/*Méthode DELETE : supprimer utilisateur */
router.delete('/:id', userPrivate.checkJWT, userController.deleteUser);

/*Méthode POST : pour l'authentification */
router.post('/authenticate', userController.authenticateUser); 

module.exports = router;