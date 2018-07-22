const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campsite = require('../models/campsite');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/campsites', (req, res, next) => {
  Campsite.find((err, campsites) => {
    if (err) return next(err);
    res.render('campsites/index', {
      title: 'campsites',
      campsites
    });
  });
});

router.post('/campsites', (req, res, next) => {
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
  res.redirect('/campsites')
});

router.get('/campsites/new',(req, res, next)=>{
  res.render('campsites/new')
})

router.get('/campsites/:id', (req, res, next) => {
  Campsite.findById(req.params.id).populate('comments').exec((err, campsite) => {
    console.log(campsite)
    if (err) return next(err);
    res.render('campsites/show', {
      campsite
    });
  });
});

