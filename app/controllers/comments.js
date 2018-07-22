const express = require('express');
const router = express.Router({mergeParams: true});
const Campsite = require('../models/campsite');
const Comment = require('../models/comment');

module.exports = (app) => {
app.use('/campsites/:id/comments', router);
};

router.post('/',isLoggedIn, (req, res, next) => {
  Campsite.findById(req.params.id, (err, campsite)=>{
    Comment.create(req.body.comment ,(err, comment)=>{
      if (err){
        console.log(err)
        res.redirect('/campsites')
      } else{
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();

        campsite.comments.push(comment);
        campsite.save((err)=>{
          if (err){
            console.log(err)
            res.redirect('/campsites')
          } else{
            console.log("comment added")
            res.redirect('/campsites/'+campsite._id)
          }
        })
      }
    })
  });
})

router.get('/new', (req, res, next)=>{
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

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
