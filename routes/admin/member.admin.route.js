import express from "express";
import { MemberService } from "../../services/admin/member.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/admin/main.hbs";
  next();
});

router
  .route("/")
  .get(MemberService.showData)
  .post(uploadImageMiddleware, MemberService.createMember);

router.route("/new").get(MemberService.getCreateMember);

router
  .route("/edit/:username")
  .get(MemberService.getUpdate)
  .post(uploadImageMiddleware, MemberService.updateMember);

router.route("/detail/:username").get(MemberService.viewDetail);

router.route("/:username/delete").get(MemberService.deleteMember);

export default router;
