import express from "express";
import initPassportLocal from "../../services/admin/auth.service.js";

const router = express.Router();

router.use((req, res, next) => {
  res.locals.layout = "/layouts/admin/login";
  next();
});

/* Auth Logic */
const passport = initPassportLocal;

/* GET users listing. */
router.get("/login", function (req, res, next) {
  let message = req.flash();
  console.log("check");
  res.render("admin/admin-auth", {
    message: message,
  });
});

router.post(
  "/login/password",
  passport.authenticate("admin-local", {
    successRedirect: "/admin/members",
    failureRedirect: "/admin/auth/login",
    failureMessage: true,
  })
);

router.get("/logout", function (req, res, next) {
  req.logout();
  res.redirect("/");
});

export default router;
