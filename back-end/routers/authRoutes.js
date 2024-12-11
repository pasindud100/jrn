import express from "express";
const router = express.Router();
import { signUp, signIn } from "../controllers/authController.js";

router.post("/sign-in", signIn);
router.post("/sign-up", signUp);


export default router;


