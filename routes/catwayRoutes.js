const express = require('express');
const router = express.Router();

/* Lien fichier catwayService.js */ 
const catwayController = require('../controllers/catwayControllers');

/* Méthode GET : afficher l'ensemble des catways */
router.get('/view', catwayController.renderCatwayList);

/* Méthode GET : Afficher le formulaire d'ajout d'un catway */
router.get('/add', catwayController.renderNewCatwayForm);

/* Méthode GET : lire l'ensemble des catways */
router.get('/', catwayController.getAllCatways);

/* Méthode GET : lire informations catway */
router.get('/:id', catwayController.getCatwayId);

/* Méthode POST : ajouter un catway */
router.post('/add', catwayController.createCatway);

/* Méthode PUT : modifier un catway */
router.put('/:id', catwayController.updateCatway);

/*Affiche le formulaire d'édition */
router.get('/:id/edit', catwayController.renderEditCatwayForm);

/* Méthode DELETE : supprimer un catway */
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;