const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campsiteSchema = new Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

campsiteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

module.exports = mongoose.model('Campsite', campsiteSchema);
