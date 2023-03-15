import { Member } from "../../models/members.model.js";
import httpMsgs from "http-msgs";
import vars from "../../vars.js";

const MemberService = {
  showData: async (req, res, next) => {
    const members = await Member.find({ isDeleted: false });
    return res.render("admin/members/member", {
      members: members,
      title: "Member Accounts Management",
    });
  },
  viewDetail: async (req, res, next) => {
    try {
      const { username } = req.params;
      const mem = await Member.findOne({ username: username });
      console.log("mem", mem);
      return res.render("admin/members/member-detail", {
        mem: mem,
        title: "Member Detail",
      });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },

  getCreateMember: async (req, res, next) => {
    try {
      return res.render("admin/members/create-member", {
        title: "Create member",
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  createMember: async (req, res, next) => {
    try {
      const {
        fullName,
        position,
        featuredImage,
        face,
        email,
        dOB,
        ig,
        phone,
        linkedin,
        twitter,
        image,
      } = req.body;

      if (!fullName || fullName.length < 1) {
      }

      const file = req.file;
      let filename = `${vars.baseUrl}/uploads/images/${file?.filename}`;

      const members = await Member.create({
        fullName,
        position,
        socialLinks: {
          facebook: face,
          instagram: ig,
          linkedin,
          twitter,
        },
        featuredImage: filename || null,
        email,
        date: dOB,
        phone: phone,
      });
      // return httpMsgs.sendJSON(req, res, { boolean: true, ac: members });
      return res.redirect("/admin/members");
    } catch (e) {
      console.log(e);
    }
  },

  getUpdate: async (req, res, next) => {
    try {
      const { username } = req.params;
      const member = await Member.findOne({ username });
      if (!member) {
        req.flash("error", "Invalid member");
        return res.redirect("/admin/members");
      }

      return res.render("admin/members/edit-member", {
        member,
        title: "Edit member " + member.fullName,
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updateMember: async (req, res, next) => {
    try {
      const { username } = req.params;
      const {
        fullName,
        position,
        featuredImage,
        face,
        email,
        dOB,
        ig,
        phone,
        linkedin,
        twitter,
      } = req.body;

      const member = await Member.findOne({ username });
      if (!member) {
        req.flash("error", "Invalid member");
        return res.redirect("/admin/members");
      }

      const file = req.file;
      let filename = `${vars.baseUrl}/uploads/images/${file?.filename}`;

      let isChange = false;
      if (fullName && member.fullName !== fullName) {
        member.fullName = fullName;
        isChange = true;
      }
      if (position && member.position !== position) {
        member.position = position;
        isChange = true;
      }
      if (file && member.featuredImage !== filename) {
        member.featuredImage = filename;
        isChange = true;
      }
      if (face && member.face !== face) {
        member.facebook = face;
        isChange = true;
      }
      if (email && member.email != email) {
        member.email = email;
        isChange = true;
      }
      if (dOB && member.dOB !== dOB) {
        member.date = dOB;
        isChange = true;
      }

      if (ig && member.ig !== ig) {
        member.instagram = ig;
        isChange = true;
      }
      if (phone && member.phone !== phone) {
        member.phone = phone;
        isChange = true;
      }
      if (linkedin && member.linkedin !== linkedin) {
        member.linkedin = linkedin;
        isChange = true;
      }
      if (twitter && member.twitter !== twitter) {
        member.twitter = twitter;
        isChange = true;
      }
      if (isChange) await member.save();

      return res.redirect(`/members/${username}`);

      // return httpMsgs.sendJSON(req, res, { boolean: true, ac: members });
    } catch (e) {
      console.log(e);
      return next(e);
    }
  },
  deleteMember: async (req, res, next) => {
    try {
      const { username } = req.params;
      const checkMember = await Member.findOne({ username });
      if (!checkMember) {
        req.flash("error", "Invalid member");
        return res.redirect("/admin/members");
      }
      await Member.findOneAndUpdate({ username }, { isDeleted: true });
      return res.redirect(`/admin/members`);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
};
export { MemberService };
