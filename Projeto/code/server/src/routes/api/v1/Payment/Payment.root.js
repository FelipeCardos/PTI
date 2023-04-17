const express = require('express');
const Stripe = require('./Payment.Stripe');
const router = express.Router();

// import routes
router.use('/stripe', Stripe);



module.exports = router;