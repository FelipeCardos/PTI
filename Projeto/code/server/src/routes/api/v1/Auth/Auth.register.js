const express = require('express');
const {FindUserOrCreate} = require('../../../../controllers/User/findUsers');
const {HashPassword} = require('../../../../controllers/Auth/password');
const router = express.Router();
require('dotenv').config();




router.post('/register',async (req, res) => {

    const errHandler = (err) => {
        console.error('Error: ', err);
        res.status(500).send('Something went wrong');
    };

    const {name, email, password, typeUser, adminSecret} = req.body;


    if ( name === undefined || email === undefined || password === undefined || typeUser === undefined ) {
        res.status(400).send('Bad Request');
    } else {
        try {
            if (typeUser === 'Admin') {
                if (adminSecret === process.env.ADMIN_SECRET) {
                    const hash = await HashPassword(password);
                    const created = await FindUserOrCreate(name, email, hash, typeUser);
                    if (created) {
                        res.status(201).send('Created');
                    } else {
                        res.status(409).send('Conflict');
                    }
                } else {
                    res.status(401).send('Unauthorized');
                }
            } else {
                const hash = await HashPassword(password);
                const created = await FindUserOrCreate(name, email, hash, typeUser);
                if (created) {
                    res.status(201).send('Created');
                } else {
                    res.status(409).send('Conflict');
                }
            }
        } catch (err) {
            errHandler(err);
        };
    }
});




module.exports = router;