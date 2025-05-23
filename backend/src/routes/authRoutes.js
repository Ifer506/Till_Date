import { Router } from "express";
import authController from "../controller/authController.js";
const router = Router();
// const upload = require('../uploads/userProfile');
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import EmailPassword from "supertokens-node/recipe/emailpassword";

//for Signing In

router.get("/", (req, res) => {
  res.send("API is working and is in user");
});

//cant use this way as instegrating supertoken is waymore difficult but good for beginers
//this cant be done as supertoken has its own method
EmailPassword.init();
// router.post("/register", authController.signup);
// router.post("/login", authController.signin);

// Now Supertokens exposes its own:

// POST /auth/signup

// POST /auth/signin

// GET /auth/session/refresh

router.get("/profile/:id",verifySession(), authController.userDetail);
router.get("/allprofile",verifySession(), authController.allUsers);
router.delete("/deleteUser/:id",verifySession(), authController.deleteUser);

router.put(
  "/profile/:id",verifySession(),
  authController.upload.single("profilepic"),
  authController.userUpdate
);

// router.get("/profilePicture/:id", authController.getPicByID);

export default router;
