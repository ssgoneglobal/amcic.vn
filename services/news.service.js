import async from "async";
import { Article } from "../models/article.model.js";

const NewsService = {
  newsListing: async (req, res, next) => {
    async
      .parallel({
        articles: (cb) => {
          Article.find({ status: true, isFeatured: false })
            .populate("category")
            .populate("author")
            .sort({ createdAt: -1 }).limit(30)
            .exec(cb);
        },
        featuredArticles: (cb) => {
          Article.find({ status: true, isFeatured: true })
            .populate("category")
            .populate("author")
            .sort({ createdAt: -1 })
            .limit(5)
            .exec(cb);
        },
      })
      .then((result) => {
        const { articles, featuredArticles } = result;
        return res.render("articles", {
          articles: articles,
          featuredArticles: featuredArticles,
          title: "News & Media",
        });
      });
  },

  getDetails: async (req, res, next) => {
    const { slug } = req.params;
    const article = await Article.findOne({ slug })
      .populate("category")
      .populate("author")
      .exec();
    return res.render("article-details", {
      title: article.title,
      article: article,
    });
  },
};
export { NewsService };
