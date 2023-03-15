import express from 'express';
import initPassportLocal from "../../services/admin/auth.service.js";

const router = express.Router()

router.use((req, res, next) => {
  res.locals.layout = '/layouts/admin/login.hbs'
  next();
})

/* Auth Logic */ 
const passport = initPassportLocal

/* GET users listing. */
router.get('/login', function(req, res, next) {
 
  let message = req.flash();
  
  res.render('admin/login', {
    message: message,
  });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/admin/members',
  failureRedirect: '/auth/login',
  failureMessage: true
}));

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

export default router;
