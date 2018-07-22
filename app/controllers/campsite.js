const express = require('express');
const router = express.Router();
const Campsite = require('../models/campsite');

module.exports = (app) => {
  app.use('/campsites', router);
};

router.get('/', (req, res, next) => {
  Campsite.find((err, campsites) => {
    if (err) return next(err);
    res.render('campsites/index', {
      title: 'campsites',
      campsites
    });
  });
});

router.post('/', isLoggedIn, (req, res, next) => {
  const {name , image, description } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  Campsite.create({
    name,
    image,
    description,
    author
  },(err, campsite)=>{
    if (err){
      console.log(err)
    } else{
      res.redirect('/')
    }
  })
});

router.get('/new', isLoggedIn, (req, res, next)=>{
  res.render('campsites/new')
})

router.get('/:id', (req, res, next) => {
  Campsite.findById(req.params.id).populate('comments').exec((err, campsite) => {
    if (err) return next(err);
    res.render('campsites/show', {
      campsite
    });
  });
});

router.get('/:id/edit', checkCampsiteOwnership, (req, res)=>{
  Campsite.findById(req.params.id, (err, campsite)=>{
    if (err){
      console.log(err)
    } else {
      res.render('campsites/edit', {campsite})
    }
  })
})

router.put('/:id', checkCampsiteOwnership, (req, res, next) => {
  Campsite.findByIdAndUpdate(req.params.id, req.body.campsite, (err, campsite)=>{
    if (err){
      console.log(err)
    } else {
      res.redirect('/campsites/'+req.params.id)
    }
  })
});

router.delete('/:id', isLoggedIn, (req, res, next) => {
  Campsite.findByIdAndRemove(req.params.id, (err, campsite)=>{
    if (err){
      console.log(err)
    }
    res.redirect('/campsites/')
  })
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
function checkCampsiteOwnership(req, res, next) {
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
