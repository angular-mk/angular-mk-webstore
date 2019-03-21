var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = require('../Schema/Comment.js');

var postSchema = new Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  preview: String,
  content: String,
  comments: [Comment.schema]
});

module.exports = mongoose.model('Post', postSchema);
