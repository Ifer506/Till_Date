import { Router } from "express";
import authController from "../controller/authController.js";
const router = Router();
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

export default router;
