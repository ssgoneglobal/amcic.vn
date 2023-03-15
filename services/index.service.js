import { Article } from "../models/article.model.js";

const indexPage = async (req, res) => {
  const featuredArticles = await Article.find({
    status: true,
    isFeatured: true,
  })
    .populate("category")
    .populate("author")
    .sort({ createdAt: -1 })
    .limit(3);

  res.render("index", {
    title: "Xuất khẩu lao động AMC",
    featuredArticles: featuredArticles,
    hasntTitle: true,
  });
};

export { indexPage };
