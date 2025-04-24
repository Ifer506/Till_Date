const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

//for Signing In

router.get("/", (req, res) => {
    res.send("API is working and is in user");
});

router.post("/", authController.signin);


module.exports = router;


