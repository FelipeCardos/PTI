const express = require("express");
const router = express.Router();

router.get("/logout", async (req, res) => {
    if (req.cookies["api-auth"] != undefined) {
        try {
            res.clearCookie("api-auth");
            res.status(200).json({ message: "Logout successful" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    else {
        try {
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('http://localhost:3000/api/v1/');
            });
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    }
});


module.exports = router;