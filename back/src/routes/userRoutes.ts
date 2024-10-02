import { Router } from "express";
import {
  register,
  login,
  getProfile,
  getAllUsers,
  activate,
  deactivate,
  updatePassword,
  updateUser,
  updatePasswordForce,
  upsateScreenMode,
} from "../controller/userController";
import auth from "../middleware/auth";

const router = Router();

router.post("/register", auth, register);
router.post("/login", login);
router.get("/profile", auth, getProfile);
router.post("/activate", auth, activate);
router.post("/deactivate", auth, deactivate);
router.post("/updatePassword", auth, updatePassword);
router.post("/updateUser", auth, updateUser);
router.get("/usersList", auth, getAllUsers);
router.post("/forcePasswordUpdate", auth, updatePasswordForce);
router.post("/updateScreenMode", auth, upsateScreenMode);
export default router;
