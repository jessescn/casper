const jwt = require('jsonwebtoken');
const configs = require('../configs/config');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ 'error': 'No token provider' })

    const parts = authHeader.split(' ');

    if (!parts.length == 2)
        return res.status(401).send({ 'error': 'token error' })

    const [schema, token] = parts;

    if (!/^Bearer$/i.test(schema))
        return res.status(401).send({ 'error': 'token malformated' })


    jwt.verify(token, configs.secret, (error, decoded) => {

        if (error)
            return res.status(401).send({ 'error': 'token invalid' })

        req.userId = decoded.id;
        return next();
    })


}