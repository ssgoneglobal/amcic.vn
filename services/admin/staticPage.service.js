import { staticPageStatusEnum } from '../../enums/staticPageStatus.enum.js';
import { StaticPage } from '../../models/staticPage.model.js';
import { Response } from '../../utils/response.js';

const PageService = {
  showData: async (req, res, next) => {
    try {
      const pages = await StaticPage.find({ status: { $nin: [staticPageStatusEnum.DELETED] } }).sort({ createdAt: -1 });

      return res.render('admin/pages/list-page', {
        pages: pages,
        title: 'List static pages',
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  viewDetail: async (req, res, next) => {
    try {
      const { slug } = req.params
      const staticPage = await StaticPage.findOne({ slug })

      return res.render('admin/pages/view-page', {staticPage, title: staticPage.title})
    } catch (error) {
      console.log(error)
      return next(error)
    }
  },

  getDetails: async (req, res, next) => {
    try {
      const { slug } = req.params
      const staticPage = await StaticPage.findOne({ slug: slug })
      if(!staticPage) return res.redirect('/admin/pages')
      return res.render('admin/pages/page-detail', {
        staticPage,
        title: staticPage.title || null
      })
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  createPage: async (req, res, next) => {
    try {
      const { name, title, content, status } = req.body;

      const staticPage = await StaticPage.create({
        name,
        title,
        content,
        status,
      });

      return res.json(Response.success(staticPage, 'Ok'));
      // return res.redirect("/admin/page")
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updatePage: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const { name, title, content, status } = req.body;

      const page = await StaticPage.findOne({ slug: slug });

      let isChange = false;
      if (title && page.title !== title) {
        page.title = title;
        isChange = true;
      }
      if (name && page.name !== name) {
        page.name = name;
        isChange = true;
      }
      if (content && page.content !== content) {
        page.content = content;
        isChange = true;
      }
      if (status && page.status !== status) {
        page.status = status;
        isChange = true;
      }

      if (isChange) await page.save();
      return res.json(Response.success(page));
    } catch (e) {
      console.log(e);
    }
  },

  deletePage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await StaticPage.findOne({ _id: id, status: { $ne: staticPageStatusEnum.DELETED } });
      if (!checkDelete) return res.json(Response.notFound());
      const page = await StaticPage.findByIdAndUpdate(id, { $set: { status: staticPageStatusEnum.DELETED } }, { new: true });

      return res.redirect('/admin/page')
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};
export { PageService };
