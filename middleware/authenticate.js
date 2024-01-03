const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("token in authenticate", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No or invalid token provided');
      return res.status(401).send('Unauthorized: no or invalid token provided');
    }

    const token = authHeader.split(' ')[1]; // Extract token after "Bearer "

    console.log('Token extracted:', token);

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token
    });

    if (!rootUser) {
      console.log('User not found');
      throw new Error('User not found');
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    console.error('Authentication error:', err);
    return res.status(401).send('Unauthorized: invalid token');
  }
};

module.exports = authenticate;
