import express from "express";
import authController from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/Authentication.js";

const router = express.Router();

router.post("/register",  authController.register);
router.post("/login", authController.login);

export default router;
