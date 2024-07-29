import { Router } from "express";
import {
  register,
  login,
  getProfile,
  activate,
  deactivate,
  updatePassword,
  updateUser,
} from "../controller/userController";
import auth from "../middleware/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.post("/activate", auth, activate);
router.post("/deactivate", auth, deactivate);
router.post("/updatePassword", auth, updatePassword);
router.post("/updateUser", auth, updateUser);

export default router;
