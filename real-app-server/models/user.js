const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  block: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  timeBlock: {
    type: Array,
  },
  cards: Array,
  favoriteCard: Array,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz, block: this.block, admin: this.admin },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    biz: Joi.boolean().required(),
    admin: Joi.boolean().required(),
    block: Joi.boolean().required(),
    timeBlock: Joi.date(),
  });

  return schema.validate(user);
}

function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
    favoriteCard: Joi.optional(),
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validateUser;
exports.validateCards = validateCards;
