const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const {encryptPassword, setAuth} = require('../utils');
const {User, Key} = require('../models')


router.post('/',  async(req, res) => {
    const {username, password} = req.body;
    const encryptedPassword = encryptPassword(password);
    const user = await User.findOne({username});
    if(user===null) return res.status(404).send({error : 'User not found'});
    else if(user.password!==encryptedPassword)  return res.status(403).send({error :'Wrong Password. Check it again.'})
    const pub = encryptPassword(crypto.randomBytes(20));
    const sec = encryptPassword(crypto.randomBytes(20));
    // front : const key = jwt.sign({publicKey : pub}, sec, {expiresIn : 600});
    const key = new Key({publicKey : pub, secretKey : sec, user});
    await key.save();

    res.send({user, publicKey : key.publicKey, secretKey : key.secretKey});
})

module.exports = router;