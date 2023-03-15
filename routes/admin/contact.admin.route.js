import express from "express";
import ContactMessage from "../../services/admin/contactMessage.service.js";
import { uploadImageMiddleware } from "../../services/admin/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/admin/main.hbs";
  next();
});

// router
//   .route("/")
//   .get(ContactMessage.showData)
//   .post(uploadImageMiddleware, ContactMessage.createMessage);

router.route("/").get(ContactMessage.showData)

// router.get("/create", ContactMessage.createMessage);

router
  .route("/:contactId")
  .get(ContactMessage.getDetails)

router.get("/:id/delete", ContactMessage.delete)

export default router;
