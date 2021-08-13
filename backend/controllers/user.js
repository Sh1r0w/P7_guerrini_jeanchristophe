const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passwordValidator = require('password-validator');
const CryptoJS = require("crypto-js");

const schema = new passwordValidator();

// Schema de PasswordValidator

schema
    .is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces();

// enregistrement utilisateur avec hashage du mot de passe par Bcrypt, encrypt du prénom et nom

exports.signup = (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {

            let firstName = CryptoJS.AES.encrypt(req.body.firstName, process.env.crypto).toString()
            let lastName = CryptoJS.AES.encrypt(req.body.lastName, process.env.crypto).toString()
            let alias = CryptoJS.AES.encrypt(req.body.alias, process.env.crypto).toString()
            if (schema.validate(req.body.password) == true) {
                user.create({
                    alias: alias,
                    firstName: firstName,
                    lastName: lastName,
                    password: hash,
                    email: req.body.email,
                });

            } else {
                console.log("Bad Password")
                next();
            }
        })
        .catch(error => res.status(500).json({ error }));
};


//login utilisateur avec vérification du mot passe par Bcrypt & création du token
exports.login = (req, res, next) => {

    user.findOne({ where: { email: req.body.login } })
        .then(user => {
            if (!user || user.actif != 1) {
                return res.status(401).json({ error: 'Utilisateur non trouvé ' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {

                    if (!valid || schema.validate(req.body.password) == false) {
                        return res.status(401).json({ error: 'Mot de passe incorrect ' });
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.token,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Récupération de l'utilisateur connecté avec le décryptage du token pour récupéré l'id
exports.getUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    user.findOne({ where: { id: userId } })
        .then(msg => res.status(200).json(msg))
        .catch(error => res.status(404).json({ error }));
};


// Récupération de tout les utilisateur
exports.getAllUser = (req, res, next) => {
    user.findAll()
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json({ error }));
};

// Supprésion d'un compte, plus précisément la désactivation du compte
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    user.findOne({ where: { id: userId } })
        .then(function (modify) { return modify.update({ actif: 0 }) })
        .catch(error => res.status(400).json({ error }));
};


// Modification du compte utilisateur

exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    console.log(req.body)
    user.findOne({ where: { id: userId } })
        .then(reponse => {

            if (req.body.newPassword) {
                bcrypt.compare(req.body.password, reponse.password)
                    .then(valid => {

                        if (!valid || schema.validate(req.body.newPassword) == false) {

                            return res.status(401).json()
                        }
                        bcrypt.hash(req.body.newPassword, 10)
                            .then(hash => {
                                if (schema.validate(req.body.newPassword) == true) {

                                    user.findOne({ where: { id: userId } })

                                        .then(function (modify) {
                                            const firstName = CryptoJS.AES.encrypt(req.body.firstName, process.env.crypto).toString()
                                            const lastName = CryptoJS.AES.encrypt(req.body.lastName, process.env.crypto).toString()
                                            let alias = CryptoJS.AES.encrypt(req.body.alias, process.env.crypto).toString()
                                            return modify.update({
                                                alias: alias,
                                                firstName: firstName,
                                                lastName: lastName,
                                                password: hash,
                                                email: req.body.email,
                                            })
                                        })
                                }
                            })
                    })
                    .catch(error => res.status(500).json({ error }));
            } else {
                const firstName = CryptoJS.AES.encrypt(req.body.firstName, process.env.crypto).toString()
                const lastName = CryptoJS.AES.encrypt(req.body.lastName, process.env.crypto).toString()
                let alias = CryptoJS.AES.encrypt(req.body.alias, process.env.crypto).toString()
                console.log(req.body)
                user.findOne({ where: { id: userId } })
                    .then(function (modify) {
                        return modify.update({
                            alias: alias,
                            lastName: lastName,
                            firstName: firstName,
                            email: req.body.email,
                        })
                    })
            }

        })
}
