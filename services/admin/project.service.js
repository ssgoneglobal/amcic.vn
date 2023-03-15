import { Project } from "../../models/project.model.js";
import { Category } from "../../models/category.model.js";
import { projectStatusEnum } from "../../enums/projectStatus.enum.js";
import { Response } from "../../utils/response.js";
import { categoryTypeEnum } from "../../enums/categoryType.enum.js";
import httpMsgs from "http-msgs";
import vars from "../../vars.js";

const ProjectService = {
  showList: async (req, res, next) => {
    try {
      const projects = await Project.find({
        status: { $in: [projectStatusEnum.DRAFT, projectStatusEnum.PUBLISHED] },
      })
        .populate("category")
        .sort({ createdAt: -1 });

      return res.render("admin/projects/list-project", {
        projects: projects,
        title: "Project List",
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  viewDetails: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const project = await Project.findOne({ slug: slug }).populate(
        "category"
      );
      const categories = await Category.find({
        type: categoryTypeEnum.PROJECT,
        _id: { $ne: project.category._id },
      });
      return res.render("admin/projects/project-view", {
        project: project,
        categories,
        title: project.title,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getDetails: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const project = await Project.findOne({ slug: slug }).populate(
        "category"
      );
      const categories = await Category.find({
        type: categoryTypeEnum.PROJECT,
        _id: { $ne: project.category._id },
      });
      return res.render("admin/projects/project-detail", {
        project: project,
        categories,
        title: project.title,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getCreateProject: async (req, res, next) => {
    try {
      const categories = await Category.find({
        type: categoryTypeEnum.PROJECT,
      });
      return res.render("admin/projects/create-project", {
        cates: categories,
        title: "Project create",
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  createProject: async (req, res, next) => {
    try {
      const { title, content, category, status } = req.body;
      const file = req.file;

      let filename = `${vars.baseUrl}/uploads/images/${file?.filename}`;

      const cat = await Category.findOne({
        _id: category,
        type: categoryTypeEnum.PROJECT,
      });
      if (!cat) return httpMsgs.sendJSON(req, res, { boolean: false });

      await Project.create({
        title,
        content: content || "content",
        thumbnail: filename,
        category: category,
        status,
      });
      return res.redirect("/admin/project");
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updateProject: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const project = await Project.findOne({ slug: slug });
      if (!project) return res.json(Response.notFound());

      const { title, content, thumbnail, category, status } = req.body;

      const file = req.file;
      let filename = `${vars.baseUrl}/uploads/images/${file?.filename}`;

      let isChange = false;
      if (title && project.title !== title) {
        project.title = title;
        isChange = true;
      }
      if (content && project.content !== content) {
        project.content = content;
        isChange = true;
      }
      if (filename && project.thumbnail !== filename) {
        project.thumbnail = filename;
        isChange = true;
      }
      if (category && project.category != category) {
        project.category = category;
        isChange = true;
      }
      if (status && project.status != status) {
        project.status = status;
        isChange = true;
      }
      if (isChange) await project.save();
      if (status) {
        return httpMsgs.sendJSON(req, res, { boolean: true });
      } else {
        return res.redirect(`/admin/project/${slug}`);
      }
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  deleteProject: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Project.findOne({
        _id: id,
        status: { $ne: projectStatusEnum.DELETED },
      });
      if (!checkDelete) return res.json("Project not found");
      const project = await Project.findByIdAndUpdate(
        id,
        { $set: { status: projectStatusEnum.DELETED } },
        { new: true }
      );
      return res.redirect("/admin/project");
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
};
export { ProjectService };
