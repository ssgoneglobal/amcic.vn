import express from "express";
import { ArticleService } from "../../services/admin/article.service.js";
// import s3Service from "../../services/s3.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/admin/main.hbs";
  next();
});

router
  .route("/")
  .get(ArticleService.showList)
  .post(uploadImageMiddleware, ArticleService.createArticle);

router.get("/create", ArticleService.getCreateArticle);

router
  .route("/:slug")
  .get(ArticleService.getDetails)
  .post(uploadImageMiddleware, ArticleService.updateArticle);

router
  .route("/:slug/view")
  .get(ArticleService.viewDetail)

router.get('/:id/delete', ArticleService.deleteArticle)

export default router;
