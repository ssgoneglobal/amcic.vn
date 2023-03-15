import { accountTypeEnum } from "../enums/accountType.enum.js";
// import { Account } from '../models/account.model.js';
const authorize =
  (roles = Object.values(accountTypeEnum)) =>
  (req, res, next) => {
    // const account = await Account.findById(req.user._id);
    if (!Array.isArray(roles)) roles = [roles];
    if (!req.user) return res.redirect("/auth/login");
    // console.log(roles, typeof req.user.type, roles.includes(req.user.type))
    if (
      roles &&
      !roles.includes(req.user.type) &&
      roles === [accountTypeEnum.ADMIN]
    ) {
      req.flash("error", "You do not have permission.");
      return res.redirect("/admin/auth/login");
    }
    if (!req.user.type) {
      return res.redirect("/auth/login");
    }
    return next();
  };
export { authorize };
