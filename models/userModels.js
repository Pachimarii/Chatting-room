const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true},
    email: { type: String, unique: true,},
    photo: { type: String, default: 'default.jpg' },
    password: { type: String, default: ''},
    facebook:{type: String, default:''},
    fbTokens:Array,
    google:{type: String, default:''},
    googleTokens:Array
  });

  userSchema.methods.encryptPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10),null);
  };

  userSchema.methods.validUserPassword = function(password){
    return bcrypt.compareSync(password, this.password);
  }
  module.exports = mongoose.model('User',userSchema);