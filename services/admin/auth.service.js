import passport from "passport";
import passportLocal from "passport-local";
import { accountTypeEnum } from "../../enums/accountType.enum.js";
import { Account } from "../../models/account.model.js";

let LocalStrategy = passportLocal.Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let user = await Account.findOne({ username: username });
        if (!user) {
          req.flash("error", "Incorrect username.");
          return done(null, false);
        }
        let checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
          req.flash("error", "Incorrect password.");
          return done(null, false);
        }

        req.flash("success", "Login success.");
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(null, false);
      }
    }
  )
);

passport.use(
  "admin-local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        let user = await Account.findOne({
          username: username,
          type: accountTypeEnum.ADMIN,
        });
        if (!user) {
          req.flash("error", "Incorrect username.");
          return done(null, false);
        }
        let checkPassword = await user.comparePassword(password);
        if (!checkPassword) {
          req.flash("error", "Incorrect password.");
          return done(null, false);
        }

        req.flash("success", "Login success.");
        return done(null, user);
      } catch (error) {
        console.log(error);
        return done(null, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

export default passport;
