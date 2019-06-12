const mongoose = require ('mongoose');
var crypto = require('crypto');
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 4,
      maxlength: 2000,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true
    },
    hashed_password: {
      type: String,
      minlength: 6,
      required: true,
    },
    salt: String,
    created: {
      type: Date,
      default: Date.now,   
    },
    updated: Date,
  });

  //virtual field
userSchema.virtual("password")
.set(function(password){
    //create a temporary variable called password
    this._password = password;
    //generate a time stamp
    this.salt = uuidv1();
    //encrypt password;
    this.hashed_password = this.encryptedPassword(password);
})
.get(function(){
    return this._password;
})

//methods
userSchema.methods = {
  authenticate: function(plainText){
    return this.encryptedPassword(plainText) === this.hashed_password
  },
    encryptedPassword: function(password){
        if(!password) return "";
        try{
          return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        }
        catch (err){
          return "";
        }
    }
    
}

module.exports = mongoose.model('User', userSchema);
