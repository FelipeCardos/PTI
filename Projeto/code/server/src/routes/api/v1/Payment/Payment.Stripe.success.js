const express = require('express');
const router = express.Router({mergeParams: true});



// import routes

router.get('/', (req, res) => {
    res.redirect('http://localhost:3000/api/v1/');
});


module.exports = router;