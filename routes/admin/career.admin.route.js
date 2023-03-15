import express from "express";
import { CareersService } from "../../services/admin/career.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/admin/main.hbs";
  next();
});

router
  .route("/")
  .get(CareersService.index)
  .post(uploadImageMiddleware, CareersService.createCareer);

router.get("/create", CareersService.getCreateCareer);

router
  .route("/:slug")
  .get(CareersService.getDetails)
  .post(uploadImageMiddleware, CareersService.update);

router
  .route("/:slug/view")
  .get(CareersService.viewDetail)

router.get("/:id/delete", CareersService.deleteCareer)

export default router;
