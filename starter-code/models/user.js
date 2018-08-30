const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: String,
  password: String,
  picture: {
    type: String,
    default: `../public/images/cat.jpeg`
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
