const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = mongoose.model('Article');

const seed = require('../seed/seed')
const camps = seed.createCampSites(15);

module.exports = (app) => {
  app.use('/', router);
};

router.get('/campsites', (req, res, next) => {
  Article.find((err, articles) => {
    if (err) return next(err);
    res.render('campsites', {
      title: 'campsites',
      camps
    });
  });
});

router.post('/campsites', (req, res, next) => {
  const {name , imageUrl } = req.body;
  camps.push({name, imageUrl})
  res.redirect('/campsites')
});

router.get('/campsites/new',(req, res, next)=>{
  res.render('new')
})
