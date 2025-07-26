const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    /* Vérification si l'utilisateur existe ou non */ 
    const user = await User.findOne({ userEmail: email });
    console.log('Tentative de connexion avec :', email, password);
    console.log(`Mot de passe : ${user.userPassword}`);

    if (!user) {
      console.log('Utilisateur non trouvé');
      return res.status(401).render('accueil', { error: 'Utilisateur non trouvé' });
    }

    /* Vérification du mot de passe */
    const passwordMatch = await bcrypt.compare(password, user.userPassword);
    if (!passwordMatch) {
      console.log('Mot de passe incorrect');
      return res.status(401).render('accueil', { error: 'Mot de passe incorrect' });
    }

    /* Création du token */
    const token = jwt.sign(
      { userId: user._id, email: user.userEmail, name: user.userName },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    /* Stockage du token en cookie (ou en session) */
    res.cookie('token', token, { httpOnly: true });
    console.log('Token envoyé, redirection vers /dashboard');

    /* Redirection vers la page tableau de bord */
    res.redirect('/dashboard');

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }

};
/* Se déconnecter de l'API */
exports.logout = (req, res) => {
res.clearCookie('token'); 
res.redirect('/');
};
