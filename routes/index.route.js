import express from "express";
import { indexPage} from "../services/index.service.js";
import { NewsService } from "../services/news.service.js";
import adminRoutes from "../routes/admin/index.route.js";
const router = express.Router();
/* GET home page. */
router.route("/").get(indexPage);
router.route("/tintuc").get(NewsService.newsListing);
router.route("/tintuc/:slug").get(NewsService.getDetails);
router.use("/", adminRoutes);


export default router;
