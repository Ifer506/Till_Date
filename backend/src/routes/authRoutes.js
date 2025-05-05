const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
// const upload = require('../uploads/userProfile'); 

//for Signing In

router.get("/", (req, res) => {
  res.send("API is working and is in user");
});

router.post("/register", authController.signup);
router.post("/login", authController.signin);
router.get("/profile/:id", authController.userDetail);
router.get("/allprofile", authController.allUsers);
router.delete("/deleteUser/:id", authController.deleteUser);


router.put(
  "/profile/:id",
  authController.upload.single("profilepic"),
  authController.userUpdate
);



// router.get("/profilePicture/:id", authController.getPicByID);

module.exports = router;
