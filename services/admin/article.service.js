import { articleStatusEnum } from "../../enums/articleStatus.enum.js";
import { categoryTypeEnum } from "../../enums/categoryType.enum.js";
import { Article } from "../../models/article.model.js";
import { Category } from "../../models/category.model.js";
import { Response } from "../../utils/response.js";
import { careerStatusEnum } from "../../enums/careerStatus.enum.js";
import vars from "../../vars.js";

import httpMsgs from "http-msgs";
import {LanguageList} from "../../models/enums.model.js";

const ArticleService = {
  showList: async (req, res, next) => {
    try {
      const articles = await Article.find({
        status: { $ne: articleStatusEnum.DELETED },
      })
        .populate("category")
        .sort({ createdAt: -1 });
      return res.render("admin/articles/news", {
        articles: articles,
        title: "News",
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  viewDetail: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ slug: slug }).populate(
        "category"
      );
      const categories = await Category.find({
        type: categoryTypeEnum.ARTICLE,
        _id: { $ne: article.category._id },
      });
      return res.render("admin/articles/news-view", {
        article: article,
        categories,
        title: article.title,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },
  getDetails: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ slug: slug }).populate(
        "category"
      );
      return res.render("admin/articles/news-detail", {
        article: article,
        title: article.title,
        languages:LanguageList
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getCreateArticle: async (req, res, next) => {
    try {
      const categories = await Category.find({
        type: categoryTypeEnum.ARTICLE,
      });


      return res.render("admin/articles/create-article", {
        categories,
        languages:LanguageList,
        title: "Create article",
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

   createArticle: async (req, res, next) => {
    try {
      const {
        title,
        subTitle,
        thumbnail,
        content,
        source,
        category,
        lan,
        status,
        featured,
      } = req.body;

      console.log("featured value", featured);
      const file = req.file;
      let filename = `${vars.baseUrl}/img/cdn/${file?.filename}`;

      await Article.create({
        title,
        subTitle,
        category,
        content: content || "",
        thumbnail: filename,
        source,
        status,
        isFeatured: featured || false,
        lan:lan
      });
      return res.redirect("/admin/news");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updateArticle: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ slug: slug });
      if (!article) return res.json(Response.notFound());

      const file = req.file;

      let filename = `${vars.baseUrl}/img/cdn/${file?.filename}`;
      let location = file?.location;

      const {
        title,
        subTitle,
        thumbnail,
        lan,
        source,
        category,
        content,
        status,
        featured,
      } = req.body;
      let isChange = false;
      if (title && article.title !== title) {
        article.title = title;
        isChange = true;
      }
      if (status && article.status !== status) {
        article.status = status;
        isChange = true;
      }
      if (subTitle && article.subTitle !== subTitle) {
        article.subTitle = subTitle;
        isChange = true;
      }
      if (file && article.thumbnail !== filename) {
        article.thumbnail = filename;
        isChange = true;
      }
      if (category && article.category != category) {
        article.category = category;
        isChange = true;
      }
      if (lan && article.lan != lan) {
        article.lan = lan;
        isChange = true;
      }
      if (source && article.source !== source) {
        article.source = source;
        isChange = true;
      }
      if (content && article.content !== content) {
        article.content = content;
        isChange = true;
      }

      if (featured && article.isFeatured != featured) {
        article.isFeatured = featured;
        isChange = true;
      }
      if (isChange) await article.save();

      if (status) {
        return httpMsgs.sendJSON(req, res, { boolean: true, ac: article });
      } else {
        return res.redirect(`/admin/news/${slug}`);
      }
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  deleteArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Article.findOne({
        _id: id,
        status: { $ne: articleStatusEnum.DELETED },
      });
      if (!checkDelete) return res.json("Career not found");
      const article = await Article.findByIdAndUpdate(
        id,
        { $set: { status: careerStatusEnum.DELETED } },
        { new: true }
      );
      return res.redirect("/admin/page");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
};
export { ArticleService };
