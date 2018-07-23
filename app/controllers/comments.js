const express = require('express');
const router = express.Router({mergeParams: true});
const Campsite = require('../models/campsite');
const Comment = require('../models/comment');
const middleware = require('../middleware');

module.exports = (app) => {
app.use('/campsites/:id/comments', router);
};

router.post('/', middleware.isLoggedIn, (req, res, next) => {
  Campsite.findById(req.params.id, (err, campsite)=>{
    Comment.create(req.body.comment ,(err, comment)=>{
      if (err){
       req.flash('error', 'Something went wrong');
        res.redirect('/campsites')
      } else{
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();

        campsite.comments.push(comment);
        campsite.save((err)=>{
          if (err){
            req.flash('error', 'Something went wrong');
            res.redirect('/campsites')
          } else{
            req.flash('success', 'Successfully added comment');
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
      req.flash('error', 'Something went wrong');
      res.redirect('/campsites')
    } else {
      res.render('comments/new',{
        campsite
      })
    }
  })
})

router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res)=>{
  const campsite_id = req.params.id
  Comment.findById(req.params.comment_id, (err, comment)=>{
    if(err){
      req.flash('error', 'Something went wrong');
    } else {
      res.render('comments/edit', {campsite_id, comment})
    }
  })
})
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res)=>{
  const campsite_id = req.params.id
  Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.comment.text}, (err, comment)=>{
    if(err){
      req.flash('error', 'Something went wrong');
    } else {
      req.flash('success', 'Successfully edited comment');
      res.redirect('/campsites/'+ campsite_id)
    }
  })
})

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res )=>{
  Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
    if (err){
      req.flash('error', 'Something went wrong');
    }else {
      req.flash('success', 'Successfully deleted comment');
      res.redirect('/campsites/'+req.params.id)
    }
  })
})

