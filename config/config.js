const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    root: rootPath,
    app: {
      name: 'campsite'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/campsite-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'campsite'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/campsite-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'campsite'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/campsite-production'
  }
};

module.exports = config[env];
