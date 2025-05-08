import { Router } from "express";
import  search  from "../services/search.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("welcome to enhacemnets");
});

router.get("/search", search.searchFunction);

export default router;
