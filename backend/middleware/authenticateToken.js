const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader && authorizationHeader.split(' ')[1];
    if(!token)
        return res.status(401).send('Authorization is required to access this resource.');
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err)
            return res.status(403).send('Invalid authorization provided.');
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;