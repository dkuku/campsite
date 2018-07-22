const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campsite = require('../models/campsite');
const Comment = require('../models/comment');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/campsites', (req, res, next) => {
  Campsite.find((err, campsites) => {
    if (err) return next(err);
    res.render('campsites', {
      title: 'campsites',
      campsites
    });
  });
});

router.post('/campsites/:id/comments',isLoggedIn, (req, res, next) => {
  Campsite.findById(req.params.id, (err, campsite)=>{
    Comment.create(req.body.comment ,(err, comment)=>{
      if (err){
        console.log(err)
        res.redirect('/campsites')
      } else{
        campsite.comments.push(comment);
        campsite.save((err)=>{
          if (err){
            console.log(err)
            res.redirect('/campsites')
          } else{
            console.log("comment added")
            res.redirect('/campsites/'+req.params.id)
          }
        })
      }
    })
  });
})

router.get('/campsites/:id/comments/new', (req, res, next)=>{
  Campsite.findById(req.params.id, (err, campsite)=>{
    if (err){
      console.log(err)
      res.redirect('/campsites')
    } else {
      res.render('comments/new',{
        campsite
      })
    }
  })
})

  router.get('/campsites/:id', (req, res, next) => {
    Campsite.findById(req.params.id).populate('comments').exec((err, campsite) => {
      console.log(campsite)
      if (err) return next(err);
      res.render('show', {
        campsite
      });
    });
  });

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
