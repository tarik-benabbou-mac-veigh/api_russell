const catwayModel = require('../models/catwayModel');
const catwayService = require('../services/catwayServices');

/* Afficher la page HTML avec les catways */
exports.renderCatwayList = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    res.render('catways/catwayList', { title: 'Liste des Catways', catways });
  } catch (error) {
    res.status(500).send('Erreur serveur');
  }
};

/* Afficher la page HTML du formulaire pour ajouter un nouveau catway */
exports.renderNewCatwayForm = async(req, res) => {
  try {
    res.render('catways/catwayForm', { title: 'Ajouter un nouveau Catway' });
  } catch (error) {
    console.error('Erreur lors du rendu du formulaire de nouveau catway :', error);
    res.status(500).send('Erreur serveur lors du chargement du formulaire.');
  }
};

/*Référence à la méthode GET (getAllCatways) catwayRoutes.js */
exports.getAllCatways = async(req,res)=>{
    const catways = await catwayService.getAllCatways();
    res.json(catways);
};

/*Référence à la méthode GET catwayRoutes.js */
exports.getCatwayId = async(req,res)=>{
    const catway = await catwayService.getCatwayId(req.params.id);
    if(!catway){
        return res.status(404).json({message:'Catway non trouvé'});
    }else{
        res.json(catway);
    }   
};

/* Reçoit les données envoyées par catwayForm.ejs :*/
exports.createCatway = async (req, res) => {
  try {
    await catwayService.createCatway(req.body);
    res.redirect('/catways/view');
  } catch (error) {
    console.error(`Erreur lors de l'ajout du catway :`, error);
    res.status(500).send(`Erreur lors de l'ajout du catway :`);
  }
};

/*Référence à la méthode PUT catwayRoutes.js */
exports.updateCatway = async (req, res) => {
  const { id } = req.params;
  const { catwayNumber, catwayType, catwayState } = req.body;

  try {
    await catwayService.updateCatway(id, {
      catwayNumber,
      catwayType,
      catwayState,
    });
    res.redirect('/catways/view');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.renderEditCatwayForm = async (req, res) => {
  try {
    const catway = await catwayService.getCatwayId(req.params.id);
    if (!catway) {
      return res.status(404).send('Catway non trouvé');
    }
    res.render('catways/catwayEdit', { title: 'Modifier un Catway', catway });
  } catch (error) {
    console.error(`Erreur lors de l’affichage du formulaire d’édition :`, error);
    res.status(500).send('Erreur serveur');
  }
};

/*Référence à la méthode DELETE catwayRoutes.js */
exports.deleteCatway = async(req,res)=>{
  await catwayService.deleteCatway(req.params.id);
  res.redirect('/catways/view');
};