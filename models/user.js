// establish mongoose dependencies for user.js
const mongoose = require('mongoose');

// establish passportLocalMongoose  dependencies for user.js
const passportLocalMongoose = require('passport-local-mongoose');
// defining user schema for username and password
var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
// plug the passportLocalMongoose package to user schema
UserSchema.plugin(passportLocalMongoose);

// export the module
module.exports = mongoose.model("User", UserSchema)