const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            user.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: hash,
                email: req.body.email,
            });

        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
user.findOne({ where: { email: req.body.login}})
.then( user => {
    if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé '});
    }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({ error: 'Mot de passe incorrect '});
            }
            res.status(200).json({ userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.token,
                    { expiresIn: '24h'}
                )   
             });
        })
        .catch(error => res.status(500).json({ error }));
})
.catch(error => res.status(500).json({ error }));
};