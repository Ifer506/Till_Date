const router = Router();
import { Router } from "express";
import salesController from "../controller/salesController.js";

router.get("/", (req, res) => {
  res.send("Lelo lelo 500 ke joote lelo, Welcome to the sales Department");
});

router.post("/salesItem", salesController.sellProduct);

router.get("/salesDetail", salesController.salesDetail);

router.delete("/salesDelete/:id", salesController.salesDelete);

export default router;
