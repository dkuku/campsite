const Campsite = require('../models/campsite');
const Comment = require('../models/comment');

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, (err, comment)=>{
      if(err){
        res.redirect('back')
      } else if (comment.author.id.equals(req.user._id)){
        next();
      } else {
        res.redirect('back');
      }
    })
  } else {
    res.redirect('back');
  }
}

middlewareObj.checkCampsiteOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Campsite.findById(req.params.id, (err, campsite)=>{
      if(err){
        res.redirect('/campsites')
      } else if (campsite.author.id.equals(req.user._id)){
        next();
      } else {
        res.redirect('back');
      }
    })
  } else {
    res.redirect('back');
  }
}
middlewareObj.isLoggedIn = function(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
module.exports = middlewareObj;
