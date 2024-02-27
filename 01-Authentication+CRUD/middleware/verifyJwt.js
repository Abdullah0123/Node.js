const jwt = require('jsonwebtoken');

module.exports.verifyJWT = async (req, res, next) => {
    const token = req.headers.authorization
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next()
      } catch(err) {
        res.status(401).json({msg: 'Unautherized'})
      } 
}