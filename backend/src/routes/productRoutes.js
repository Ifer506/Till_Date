import { Router } from "express";
import productController from "../controller/productController.js";
import upload from "../middleware/uploadMiddleware.js";
const router = Router();

router.get("/", (req, res) => {
  res.send("You have arrived at the inventory");
});

router.post(
  "/addProduct",
  upload.single("itemImage"),
  productController.addProduct
);

router.get("/allProducts", productController.allProducts);

router.delete("/deleteProduct/:id", productController.deleteProduct);

router.put("/updateProduct/:id" , productController.updateProduct);

router.get("/oneProducts/:id", productController.oneProduct);


export default router;
