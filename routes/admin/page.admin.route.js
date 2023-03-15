import express from "express";
import { PageService } from "../../services/admin/staticPage.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";

const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/admin/main.hbs";
  next();
});

router.route("/")
  .get(PageService.showData)
  .post(PageService.createPage);

router.get("/create", (req, res) => {
  res.render("admin/pages/create-page", { title: "Create page" });
});


router
  .route("/:slug")
  .get(PageService.getDetails)
  .post(PageService.updatePage);

router.route("/:id/delete").get(PageService.deletePage)

router.route("/:slug/view").get(PageService.viewDetail)

export default router;
