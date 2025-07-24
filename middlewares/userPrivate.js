const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

exports.checkJWT = (req, res, next) => {
  let token = req.cookies.token;

  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json('token_required');
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json('token_not_valid');
  }
};
