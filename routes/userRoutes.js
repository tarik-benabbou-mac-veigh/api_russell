const express = require('express');
const router = express.Router();

// Lien fichier userService.js : 
const userController = require('../controllers/userControllers');

/*Méthode GET : afficher l'ensemble des utilisateurs*/
router.get('/', userController.getAllUsers);

/*Méthode GET : lire informations utilisateur */
router.get('/:id', userController.getUserId);

/*Méthode POST : ajouter un utilisateur */
router.post('/add', userController.createUser);

/*Méthode PUT : modifier un utilisateur */
router.put('/:id', userController.updateUser);

/*Méthode DELETE : supprimer utilisateur */
router.delete('/:id', userController.deleteUser);

module.exports = router;