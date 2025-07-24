const express = require('express');
const router = express.Router();

// Lien fichier userService.js : 
const userController = require('../controllers/userControllers');

/* Lien avec le middleware */
const userPrivate = require('../middlewares/userPrivate');

/* Méthode GET : afficher l'ensemble des utilisateurs */
router.get('/view', userController.renderUserList);

/* Méthode GET : Afficher le formulaire d'ajout d'un bateau */
router.get('/add', userController.renderNewUserForm);

/*Méthode GET : afficher l'ensemble des utilisateurs*/
router.get('/', userController.getAllUsers);

/*Méthode GET : lire informations utilisateur */
router.get('/:id', userPrivate.checkJWT, userController.getUserId);

/*Méthode POST : ajouter un utilisateur */
router.post('/add', userController.createUser);

/*Méthode PUT : modifier un utilisateur */
router.put('/:id', userController.updateUser);
// userPrivate.checkJWT,

/*Méthode DELETE : supprimer utilisateur */
router.delete('/:id', userController.deleteUser);
// userPrivate.checkJWT,

/*Affiche le formulaire d'édition */
router.get('/:id/edit', userController.renderEditUserForm)

/*Méthode POST : pour l'authentification */
router.post('/authenticate', userController.authenticateUser); 

module.exports = router;