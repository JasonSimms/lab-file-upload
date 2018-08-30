const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostsSchema = Schema({
  content: {
    type: String,
    required: true
  },
  creatorId: String,
  creatorName: String,
  picPath: String,
  picName: String,
});

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;
