const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/", (req,res) =>{ res.send("You have arrived at the inventory")} )

router.post("/addProduct", productController.addProduct);

router.get( "/allProducts" , productController.allProducts);

router.delete("/deleteProduct/:id" , productController.deleteProduct);


module.exports = router 