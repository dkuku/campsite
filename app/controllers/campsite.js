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

router.post('/', (req, res, next) => {
  const {name , imageUrl } = req.body;
  Campsite.create({
    name,
    image: imageUrl
  },(err, campsite)=>{
    if (err){
      console.log(err)
    } else{
      console.log(campsite)
    }
  })
  res.redirect('/')
});

router.get('/new',(req, res, next)=>{
  res.render('campsites/new')
})

router.get('/:id', (req, res, next) => {
  Campsite.findById(req.params.id).populate('comments').exec((err, campsite) => {
    console.log(campsite)
    if (err) return next(err);
    res.render('campsites/show', {
      campsite
    });
  });
});

