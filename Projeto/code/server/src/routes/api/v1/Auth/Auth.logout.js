const express = require("express");
const router = express.Router();

router.get("/logout", async (req, res) => {
    if (req.cookies["api-auth"] != undefined) {
        try {
            res.clearCookie("api-auth");
            res.redirect('http://localhost:5173/');
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    else {
        try {
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('http://localhost:5173/');
            });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
});


module.exports = router;