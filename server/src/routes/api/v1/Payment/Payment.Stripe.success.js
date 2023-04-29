const express = require('express');
const router = express.Router({mergeParams: true});
const {ChangeCartStatus} = require('../../../../controllers/Cart/changeCartStatus');



// import routes

router.get('/', (req, res) => {
    ch
    res.redirect('http://localhost:3000/api/v1/');
});


module.exports = router;