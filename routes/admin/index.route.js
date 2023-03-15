import express from "express";
import authRoutes from "./auth.route.js";
import adminAuthRoutes from "./auth.admin.route.js";
import adminRoutes from "./apiAdmin.route.js";

import { authorize } from "../../middlewares/authorize.js";
import { accountTypeEnum } from "../../enums/accountType.enum.js";

const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    return res.redirect("/admin");
  } catch (err) {
    console.error(err);
    return next(err);
  }
});

router.use("/auth", authRoutes);
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin", authorize(accountTypeEnum.ADMIN), adminRoutes);

export default router;
