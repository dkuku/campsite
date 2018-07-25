const express = require('express');
const router = express.Router();
const Campsite = require('../models/campsite');
const middleware = require('../middleware');

module.exports = (app) => {
  app.use('/campsites', router);
};

router.get('/', (req, res, next) => {
  Campsite.find((err, campsites) => {
    if (err) return next(err);
    res.render('campsites/index', {
      title: 'campsites',
      campsites,
      page: 'campsites'
    });
  });
});

router.post('/', middleware.isLoggedIn, (req, res, next) => {
  const {name, price, image, description } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  Campsite.create({
    name,
    image,
    description,
    price,
    author
  },(err, campsite)=>{
    if (err){
      console.log(err)
    } else{
      res.redirect('/campsites/'+campsite._id)
    }
  })
});

router.get('/new', middleware.isLoggedIn, (req, res, next)=>{
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

router.get('/:id/edit', middleware.checkCampsiteOwnership, (req, res)=>{
  Campsite.findById(req.params.id, (err, campsite)=>{
    if (err){
      console.log(err)
    } else {
      res.render('campsites/edit', {campsite})
    }
  })
})

router.put('/:id', middleware.checkCampsiteOwnership, (req, res, next) => {
  Campsite.findByIdAndUpdate(req.params.id, req.body.campsite, (err, campsite)=>{
    if (err){
      console.log(err)
    } else {
      res.redirect('/campsites/'+req.params.id)
    }
  })
});

router.delete('/:id', middleware.checkCampsiteOwnership, (req, res, next) => {
  Campsite.findByIdAndRemove(req.params.id, (err, campsite)=>{
    if (err){
      console.log(err)
    }
    res.redirect('/campsites/')
  })
});

