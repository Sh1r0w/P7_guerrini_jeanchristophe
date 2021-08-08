const { user } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const passwordValidator = require('password-validator');
const CryptoJS = require("crypto-js");

const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(16)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();


exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let firstName = CryptoJS.AES.encrypt(req.body.firstName, process.env.crypto).toString()
            let lastName = CryptoJS.AES.encrypt(req.body.lastName, process.env.crypto).toString()
            if( schema.validate(req.body.password) == true){
            user.create({
                firstName: firstName,
                lastName: lastName,
                password: hash,
                email: req.body.email,
            }),
            res.status(200).json({ userId: user.id,
                token: jwt.sign(
                    { userId: user.id },
                    process.env.token,
                    { expiresIn: '24h'}
                )   
             });
            }else{
                console.log("Bad Password")
                next();
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    
user.findOne({ where: { email: req.body.login}})
.then( user => { 
    if (!user || user.actif != 1) {
        return res.status(401).json({ error: 'Utilisateur non trouvé '});
    }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            
            if (!valid ||  schema.validate(req.body.password) == false){
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

exports.getUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    user.findOne({where: { id: userId }})
      .then(msg => res.status(200).json(msg))
      .catch(error => res.status(404).json({ error }));
  };

  exports.getAllUser = (req, res, next) => {
    user.findAll() 
      .then(message => res.status(200).json(message))
      .catch(error => res.status(400).json({ error }));
  };

exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    user.findOne({where: { id: userId }})
      .then(function (modify) { return modify.update({ actif: 0 })})
      .catch(error => res.status(400).json({ error }));
  };

exports.modifyUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.token);
    const userId = verify.userId;
    console.log(req.body)
      user.findOne({where: { id: userId }})
      .then(userModify => { 
        
    if(req.body.newPassword != null){
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
                
        if (!valid ||  schema.validate(req.body.newPassword) == false){
            
                    return res.status(401).json({ error: 'Mot de passe incorrect '})
                }
                    bcrypt.hash(req.body.newPassword, 10)
                        .then(hash => {
                            if( schema.validate(req.body.newPassword) == true){

                            user.findOne({where: { id: userId }})
                                .then(function (modify) {
                            return modify.update({
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
    }else{ 
        const firstName = CryptoJS.AES.encrypt(req.body.firstName, process.env.crypto).toString()
        const lastName = CryptoJS.AES.encrypt(req.body.lastName, process.env.crypto).toString()
        console.log(req.body)
        user.findOne({where: { id: userId }})
      .then(function (modify) { 
        return modify.update({ 
          lastName: lastName,
          firstName: firstName,
          email: req.body.email,
      })
    })
            }
  
    })
}
  