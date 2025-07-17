const userService = require('../services/userServices');

/*Référence à la méthode GET (getAllUsers) userRoute.js */
exports.getAllUsers = async(req,res)=>{
    const users = await userService.getAllUsers();
    res.json(users);
};

/*Référence à la méthode GET userRoute.js */
exports.getUserId = async(req,res)=>{
    const user = await userService.getUserId(req.params.id);
    if(!user){
        return res.status(404).json({message:'Utilisateur non trouvé'});
    }else{
        res.json(user);
    }   
};

/*Référence à la méthode POST userRoute.js */
exports.createUser = async(req,res)=>{
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
};

/*Référence à la méthode PUT userRoute.js */
exports.updateUser = async(req,res)=>{
    const updateUser = await userService.updateUser(req.params.id, req.body);
    res.json(updateUser);
};

/*Référence à la méthode DELETE userRoute.js */
exports.deleteUser = async(req,res)=>{
    await userService.deleteUser(req.params.id);
    res.status(204).send('/');
};