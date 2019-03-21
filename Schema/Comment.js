var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  content: String
});

module.exports = mongoose.model('Comments', commentSchema);
module.exports.schema = commentSchema;
