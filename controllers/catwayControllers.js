const catwayService = require('../services/catwayServices');

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

/*Référence à la méthode POST catwayRoutes.js */
exports.createCatway = async(req,res)=>{
    const newCatway = await catwayService.createCatway(req.body);
    res.status(201).json(newCatway);
};

/*Référence à la méthode PUT catwayRoutes.js */
exports.updateCatway = async(req,res)=>{
    const updateCatway = await catwayService.updateCatway(req.params.id, req.body);
    res.json(updateCatway);
};

/*Référence à la méthode DELETE catwayRoutes.js */
exports.deleteCatway = async(req,res)=>{
    await catwayService.deleteCatway(req.params.id);
    res.status(204).send('/');
};