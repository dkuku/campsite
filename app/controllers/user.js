const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/register', (req, res, next) => {
  res.render('auth/register');
});

router.post('/register', (req, res, next) => {
  const newUser = new User({username: req.body.username});
  User.register(newUser, req.body.password, (err, user)=>{
    if (err){
      console.log(err);
      return res.render('auth/register');
    } else {
      passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/register'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/campsites');
        });
      })(req, res, next);
    }
  })
})

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login',
  passport.authenticate('local',{
    successRedirect: '/campsites',
    failureRedirect: '/login'
  })
)

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/campsites');
});
