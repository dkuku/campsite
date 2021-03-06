const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campsiteSchema = new Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, { usePushEach: true });

campsiteSchema.virtual('date')
  .get(() => this._id.getTimestamp());

module.exports = mongoose.model('Campsite', campsiteSchema);
