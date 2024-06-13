import express from "express";
import authController from "../controllers/AuthController.js";

const router = express.Router();

router.get("/me", authController.me);
router.post("/register",  authController.register);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);

export default router;
