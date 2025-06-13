import express from "express";
import { loginOwner } from "../controllers/ownerController.js";

const router = express.Router();

router.post("/login", loginOwner);

export default router;
