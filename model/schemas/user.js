const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
  },
  token: {
    type: String,
    default: null,
  },
});

const User = model("user", userSchema);

module.exports = User;
