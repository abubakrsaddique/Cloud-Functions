import { Router } from "express";
import {
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController";

const router = Router();

router.post("/create", createUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

export default router;
