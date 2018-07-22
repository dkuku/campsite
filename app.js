const express = require('express');
const passport = require('passport');
const config = require('./config/config');
const glob = require('glob');
const mongoose = require('mongoose');

mongoose.promise = global.Promise;

mongoose.connect(config.db,{
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});
const db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

const models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});
const app = express();

const seedDB = require('./app/seed/seed')
//seedDB()
//const camps = seed.createCampSites(15);

module.exports = require('./config/express')(app, config, passport );

//hot reload in development
if(app.locals.ENV_DEVELOPMENT) {
  const chokidar = require('chokidar');

  const watcher = chokidar.watch('./app');
  watcher.on('ready', function() {
    watcher.on('all', function() {
      console.log("Clearing /dist/ module cache from server")
      Object.keys(require.cache).forEach(function(id) {
        if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
      })
    })
  })
}

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});

