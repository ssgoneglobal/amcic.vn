import express from "express";
import memeberRouter from "./member.admin.route.js";
import projectRouter from "./project.admin.route.js";
import newsRouter from "./article.admin.route.js";
import articleRouter from "./page.admin.route.js"
import careerRouter from "./career.admin.route.js";
import uploadMedia from "../../services/admin/s3.service.js";
import pageRouter from "./page.admin.route.js";
import contactMessage from '../../services/admin/contactMessage.service.js'
import contactRoutes from './contact.admin.route.js'
import { ArticleService } from "../../services/admin/article.service.js";
import s3Service from "../../services/admin/s3.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";

const router = express.Router();

// router.get("/", ArticleService.showList);
router.use("/pages", pageRouter)
router.use("/members", memeberRouter);
router.use("/project", projectRouter);
router.use("/contacts", contactRoutes);

router.use("/news", newsRouter);
router.use("/career", careerRouter);
router.use("/s3-upload", uploadMedia.getResignedUrl);
router.use("/page", pageRouter);
router.use(
  "/ckeditor-images",
  uploadImageMiddleware,
  s3Service.getUploadImg
);

export default router;
