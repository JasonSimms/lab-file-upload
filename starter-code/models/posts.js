const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostsSchema = Schema({
  content: String,
  creatorId: {
    type: String,
    default: 'yoda'
  },
  picPath: String,
  picName: String,
});

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;
