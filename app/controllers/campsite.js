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
  const {name , imageUrl, description } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  Campsite.create({
    name,
    image: imageUrl,
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
    console.log(campsite)
    if (err) return next(err);
    res.render('campsites/show', {
      campsite
    });
  });
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect('/login')
}
