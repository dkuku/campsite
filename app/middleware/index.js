const Campsite = require('../models/campsite');
const Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, comment)=>{
      if(err){
        req.flash('error', 'Error in the database')
        res.redirect('back')
      } else if (comment.author.id.equals(req.user._id)){
        next();
      } else {
        req.flash('error', 'You do not have ermission to do that')
        res.redirect('back');
      }
    })
  } else {
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('back');
  }
}

middlewareObj.checkCampsiteOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Campsite.findById(req.params.id, (err, campsite)=>{
      if(err){
    req.flash('error', 'Error in the database')
        res.redirect('/campsites')
      } else if (campsite.author.id.equals(req.user._id)){
        next();
      } else {
    req.flash('error', 'You need to be logged in to do that')
        res.redirect('back');
      }
    })
  } else {
    req.flash('error', 'You do not have ermission to do that')
    res.redirect('back');
  }
}
middlewareObj.isLoggedIn = function(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }else {
    req.flash('error', 'You need to be logged in to do that')
    res.redirect('/login')
  }
}
module.exports = middlewareObj;
