import express from "express";
import { ProjectService } from "../../services/admin/project.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/admin/main.hbs";
  next();
});

router
  .route("/")
  .get(ProjectService.showList)
  .post(uploadImageMiddleware, ProjectService.createProject);

router.get("/create", ProjectService.getCreateProject);

router
  .route("/:slug")
  .get(ProjectService.getDetails)
  .post(uploadImageMiddleware, ProjectService.updateProject);

router.route('/:slug/views').get(ProjectService.viewDetails)

router.get("/:id/delete", ProjectService.deleteProject)

export default router;
