const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostsSchema = Schema({
  content: {
    type: String,
    required: true
  },
  creatorId: String,
  creatorName: String,
  picPath: {
    type: String,
    default: `/images/postpics/dogecoin.jpeg`
  },
  picName: {
    type: String,
    default: `dogecoin.jpeg`
  }
});

const Posts = mongoose.model('Posts', PostsSchema);

module.exports = Posts;
