const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    /* Vérification si l'utilisateur existe ou non */ 
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).render('accueil', { error: 'Utilisateur non trouvé' });
    }

    /* Vérification du mot de passe */
    const passwordMatch = await bcrypt.compare(password, user.userPassword);
    if (!passwordMatch) {
      return res.status(401).render('accueil', { error: 'Mot de passe incorrect' });
    }

    /* Création du token */
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    /* Stockage du token en cookie (ou en session) */
    res.cookie('token', token, { httpOnly: true });

    /* Redirection vers la page tableau de bord */
    res.redirect('/dashboard');

  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur interne du serveur');
  }
};
