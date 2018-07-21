const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Campsite = mongoose.model('Campsite');

const seed = require('../seed/seed')
//const camps = seed.createCampSites(15);

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
  res.render('new')
})
