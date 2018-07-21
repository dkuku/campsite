// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampsiteSchema = new Schema({
  name: String,
  image: String,
});

CampsiteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Campsite', CampsiteSchema);

