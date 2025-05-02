const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
// const upload = require('../uploads/userProfile'); // Adjust accordingly

//for Signing In

router.get("/", (req, res) => {
    res.send("API is working and is in user");
});

router.post("/register", authController.signup);
router.post("/login", authController.signin)
router.get("/profile/:id",authController.userDetail);

router.put('/profile/:id', authController.upload.single('profile_picture'), authController.userUpdate);


module.exports = router;


