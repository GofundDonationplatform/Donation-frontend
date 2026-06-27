import express from "express";
import { initializePaystack } from "../controllers/paystackController.js";

const router = express.Router();

router.post("/initialize", initializePaystack);

export default router;
