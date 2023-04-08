const express = require('express');
const router = express.Router();

const {UserWithEmail} = require('../../../../controllers/User/findUsers');
const {ComparePassword} = require('../../../../controllers/Auth/password');
const jwt = require('jsonwebtoken');  
const dayjs = require("dayjs");


router.post('/login' , async (req, res) => {
    
    const errHandler = (err) => {
        console.error('Error: ', err);
        res.status(500).send('Something went wrong');
    };

    const {email, password} = req.body;

    if ( email === undefined || password === undefined ) {
        res.status(400).send('Bad Request');
    } else {
        const userWithEmail = await UserWithEmail(email);
        if (userWithEmail === null) {
            res.status(401).send('Unauthorized');
        }
        else {
            if (ComparePassword(password, userWithEmail.password)) {
                const jwToken = jwt.sign({id: userWithEmail.id}, process.env.JWT_SECRET1);
                res.cookie("api-auth", jwToken, {
                    secure: false,
                    httpOnly: true,
                    expires: dayjs().add(7, "days").toDate(),
                });
                res.status(200).send('Authorized');
            } else {
                res.status(401).send('Unauthorized');
            }
        }
    }
    
        
});










module.exports = router;