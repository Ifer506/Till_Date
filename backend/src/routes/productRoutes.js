const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const productController = require("../controller/productController");

router.get("/", (req,res) =>{ res.send("You have arrived at the inventory")} )

router.post("/addProduct", upload.single("itemImage"),productController.addProduct);

router.get( "/allProducts" , productController.allProducts);

router.delete("/deleteProduct/:id" , productController.deleteProduct);


module.exports = router 